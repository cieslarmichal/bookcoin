import { CreateBlockchainPayload, createBlockchainSchema } from './payloads/createBlockchainPayload.js';
import { Schema } from '../../../../libs/validator/schema.js';
import { SchemaType } from '../../../../libs/validator/schemaType.js';
import { Validator } from '../../../../libs/validator/validator.js';
import { BlockIndexNotMatchingIncrementedIndexFromPreviousBlockError } from '../../errors/blockIndexNotMatchingIncrementedIndexFromPreviousBlockError.js';
import { BlockPreviousHashNotMatchingHashFromPreviousBlockError } from '../../errors/blockPreviousHashNotMatchingHashFromPreviousBlockError.js';
import { BlocksNotProvidedInBlockchainError } from '../../errors/blocksInBlockchainNotProvidedError.js';
import { GenesisBlockNotProvidedInBlockchainError } from '../../errors/genesisBlockNotProvidedInBlockchainError.js';
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

  public getLastBlock(): Block {
    return this.blocks.at(-1) as Block;
  }

  public addBlock(blockchainService: BlockchainService, newBlock: Block): void {
    const previousBlock = this.getLastBlock();

    const newBlockIsValid = blockchainService.checkIfNewBlockIsValid({ newBlock, previousBlock });

    if (!newBlockIsValid) {
      return;
    }

    this.blocks.push(newBlock);

    // TODO: broadcast event
  }

  public replaceBlocks(newBlocks: Block[]): void {
    const newBlocksAreValid = blockchainService.checkIfBlocksAreValid({ blocks: newBlocks });

    const newBlocksAreLongerThanCurrentBlocks = newBlocks.length > this.blocks.length;

    if (newBlocksAreValid && newBlocksAreLongerThanCurrentBlocks) {
      this.blocks = newBlocks;

      // TODO: broadcast event
    }
  }

  public checkIfBlocksAreValid(input: CheckIfNewBlockIsValidPayload): boolean {
    const { newBlock, previousBlock } = Validator.validate(checkIfNewBlockIsValidPayloadSchema, input);

    if (newBlock.index !== previousBlock.index + 1) {
      console.log({
        message: 'Index does not match incremented index from previous block.',
        newBlockIndex: newBlock.index,
        previousBlockIndex: previousBlock.index,
      });

      return false;
    }

    if (previousBlock.hash !== newBlock.previousHash) {
      console.log({
        message: 'Previous hash does not match hash from last block in blockchain.',
        newBlockPreviousHash: newBlock.previousHash,
        previousBlockHash: previousBlock.hash,
      });

      return false;
    }

    return this.blockService.checkIfBlockHashIsValid({ block: newBlock });
  }

  public static createBlockchain(input: CreateBlockchainPayload): Blockchain {
    const { genesisBlockService, blocks } = Validator.validate(createBlockchainSchema, input);

    if (!blocks) {
      throw new BlocksNotProvidedInBlockchainError();
    }

    const sortedBlocks = blocks.sort((block1, block2) => block1.index - block2.index);

    const firstBlock = sortedBlocks[0] as Block;

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

    return new Blockchain({ blocks });
  }
}
