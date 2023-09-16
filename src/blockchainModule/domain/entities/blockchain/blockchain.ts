import { CreateBlockchainPayload, createBlockchainSchema } from './payloads/createBlockchainPayload.js';
import { AggregateRoot } from '../../../../common/types/domain/aggregateRoot.js';
import { Schema } from '../../../../libs/validator/schema.js';
import { SchemaType } from '../../../../libs/validator/schemaType.js';
import { Validator } from '../../../../libs/validator/validator.js';
import { BlockIndexNotMatchingIncrementedIndexFromPreviousBlockError } from '../../errors/blockIndexNotMatchingIncrementedIndexFromPreviousBlockError.js';
import { BlockPreviousHashNotMatchingHashFromPreviousBlockError } from '../../errors/blockPreviousHashNotMatchingHashFromPreviousBlockError.js';
import { BlocksNotProvidedInBlockchainError } from '../../errors/blocksInBlockchainNotProvidedError.js';
import { GenesisBlockNotProvidedInBlockchainError } from '../../errors/genesisBlockNotProvidedInBlockchainError.js';
import { ProvidedBlocksNotLongerThanBlockchainError } from '../../errors/providedBlocksNotLongerThanBlockchainError.js';
import { GenesisBlockService } from '../../services/genesisBlockService/genesisBlockService.js';
import { Block } from '../../valueObjects/block/block.js';
import { BlockAddedToBlockchainEvent } from '../../events/blockchain/blockAddedToBlockchainEvent.js';
import { BlocksReplacedInBlockchainEvent } from '../../events/blockchain/blocksReplacedInBlockchainEvent.js';

export const blockchainInputSchema = Schema.object({
  blocks: Schema.array(Schema.custom<Block>((data) => data instanceof Block)),
});

export type BlockchainInput = SchemaType<typeof blockchainInputSchema>;

export class Blockchain extends AggregateRoot<void> {
  private blocks: Block[];

  private constructor(input: BlockchainInput) {
    super();

    const { blocks } = Validator.validate(blockchainInputSchema, input);

    this.blocks = blocks;
  }

  public getBlocks(): Block[] {
    return this.blocks;
  }

  public addBlock(genesisBlockService: GenesisBlockService, blockData: string): void {
    const previousBlock = this.blocks.at(-1) as Block;

    const newBlock = Block.createBlock({
      genesisBlockService,
      index: previousBlock.index + 1,
      previousHash: previousBlock.hash,
      data: blockData,
    });

    this.blocks.push(newBlock);

    this.addDomainEvent(new BlockAddedToBlockchainEvent({ blockchain: this }));
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

    this.addDomainEvent(new BlocksReplacedInBlockchainEvent({ blockchain: this }));
  }

  public static createBlockchain(input: CreateBlockchainPayload): Blockchain {
    const { genesisBlockService, blocks } = Validator.validate(createBlockchainSchema, input);

    const sortedBlocks = blocks.sort((block1, block2) => block1.index - block2.index);

    Blockchain.validateSortedBlocks(genesisBlockService, sortedBlocks);

    return new Blockchain({ blocks: sortedBlocks });
  }

  private static validateSortedBlocks(genesisBlockService: GenesisBlockService, blocks: Block[]): void {
    if (!blocks.length) {
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
