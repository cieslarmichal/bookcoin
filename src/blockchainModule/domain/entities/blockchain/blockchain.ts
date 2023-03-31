import { CreateBlockchainPayload, createBlockchainSchema } from './payloads/createBlockchainPayload.js';
import { Schema } from '../../../../libs/validator/schema.js';
import { SchemaType } from '../../../../libs/validator/schemaType.js';
import { Validator } from '../../../../libs/validator/validator.js';
import { BlockIndexNotMatchingIncrementedIndexFromPreviousBlockError } from '../../errors/blockIndexNotMatchingIncrementedIndexFromPreviousBlockError.js';
import { BlockPreviousHashNotMatchingHashFromPreviousBlockError } from '../../errors/blockPreviousHashNotMatchingHashFromPreviousBlockError.js';
import { BlocksNotProvidedInBlockchainError } from '../../errors/blocksInBlockchainNotProvidedError.js';
import { GenesisBlockNotProvidedInBlockchainError } from '../../errors/genesisBlockNotProvidedInBlockchainError.js';
import { ProvidedBlocksNotLongerThanBlockchainError } from '../../errors/providedBlocksNotLongerThanBlockchainError.js';
import { GenesisBlockService } from '../../services/genesisBlockService/genesisBlockService.js';
import { Block } from '../block/block.js';

export const blockchainInputSchema = Schema.object({
  blocks: Schema.array(Schema.custom<Block>((data) => data instanceof Block)),
});

export type BlockchainInput = SchemaType<typeof blockchainInputSchema>;

export class Blockchain {
  private blocks: Block[];

  private constructor(input: BlockchainInput) {
    const { blocks } = Validator.validate(blockchainInputSchema, input);

    this.blocks = blocks;
  }

  public getBlocks(): Block[] {
    return this.blocks;
  }

  public getLastBlock(): Block {
    return this.blocks.at(-1) as Block;
  }

  public addBlock(newBlock: Block): void {
    const previousBlock = this.getLastBlock();

    if (newBlock.index !== previousBlock.index + 1) {
      throw new BlockIndexNotMatchingIncrementedIndexFromPreviousBlockError({
        blockIndex: newBlock.index,
        indexFromPreviousBlock: previousBlock.index,
      });
    }

    if (newBlock.previousHash !== previousBlock.hash) {
      throw new BlockPreviousHashNotMatchingHashFromPreviousBlockError({
        blockPreviousHash: newBlock.previousHash,
        hashFromPreviousBlock: previousBlock.hash,
      });
    }

    this.blocks.push(newBlock);

    // TODO: broadcast event
  }

  public replaceBlocksWithLongerBlocks(genesisBlockService: GenesisBlockService, newBlocks: Block[]): void {
    const newBlocksAreLongerThanCurrentBlocks = newBlocks.length > this.blocks.length;

    if (!newBlocksAreLongerThanCurrentBlocks) {
      throw new ProvidedBlocksNotLongerThanBlockchainError({
        providedBlocksSize: newBlocks.length,
        blockchainSize: this.blocks.length,
      });
    }

    const sortedNewBlocks = newBlocks.sort((block1, block2) => block1.index - block2.index);

    Blockchain.validateSortedBlocks(genesisBlockService, sortedNewBlocks);

    this.blocks = sortedNewBlocks;

    // TODO: broadcast event
  }

  public static createBlockchain(input: CreateBlockchainPayload): Blockchain {
    const { genesisBlockService, blocks } = Validator.validate(createBlockchainSchema, input);

    const sortedBlocks = blocks.sort((block1, block2) => block1.index - block2.index);

    Blockchain.validateSortedBlocks(genesisBlockService, sortedBlocks);

    return new Blockchain({ blocks: sortedBlocks });
  }

  private static validateSortedBlocks(genesisBlockService: GenesisBlockService, blocks: Block[]): void {
    if (!blocks) {
      throw new BlocksNotProvidedInBlockchainError();
    }

    const firstBlock = blocks[0] as Block;

    if (!genesisBlockService.checkIfBlockIsGenesisBlock(firstBlock)) {
      throw new GenesisBlockNotProvidedInBlockchainError();
    }

    for (let i = 1; i < blocks.length; i++) {
      const currentBlock = blocks[i] as Block;

      const previousBlock = blocks[i - 1] as Block;

      if (currentBlock.index !== previousBlock.index + 1) {
        throw new BlockIndexNotMatchingIncrementedIndexFromPreviousBlockError({
          blockIndex: currentBlock.index,
          indexFromPreviousBlock: previousBlock.index,
        });
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        throw new BlockPreviousHashNotMatchingHashFromPreviousBlockError({
          blockPreviousHash: currentBlock.previousHash,
          hashFromPreviousBlock: previousBlock.hash,
        });
      }
    }
  }
}
