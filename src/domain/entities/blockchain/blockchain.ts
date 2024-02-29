import { OperationNotValidError } from '../../../common/errors/operationNotValidError.js';
import { type GenesisBlockService } from '../../services/genesisBlockService/genesisBlockService.js';
import { Block } from '../block/block.js';

export interface BlockchainDraft {
  readonly blocks: Block[];
}

export interface CreateBlockchainPayload {
  readonly genesisBlockService: GenesisBlockService;
  readonly blocks: Block[];
}

export class Blockchain {
  private blocks: Block[];

  private constructor(draft: BlockchainDraft) {
    const { blocks } = draft;

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
  }

  public replaceBlocksWithLongerBlocks(genesisBlockService: GenesisBlockService, newBlocks: Block[]): void {
    const newBlocksAreLongerThanCurrentBlocks = newBlocks.length > this.blocks.length;

    if (!newBlocksAreLongerThanCurrentBlocks) {
      throw new OperationNotValidError({
        reason: 'New blocks are not longer than current blocks.',
        providedBlocksSize: newBlocks.length,
        blockchainSize: this.blocks.length,
      });
    }

    const sortedNewBlocks = newBlocks.sort((block1, block2) => block1.index - block2.index);

    Blockchain.validateSortedBlocks(genesisBlockService, sortedNewBlocks);

    this.blocks = sortedNewBlocks;
  }

  public static createBlockchain(payload: CreateBlockchainPayload): Blockchain {
    const { genesisBlockService, blocks } = payload;

    const sortedBlocks = blocks.sort((block1, block2) => block1.index - block2.index);

    Blockchain.validateSortedBlocks(genesisBlockService, sortedBlocks);

    return new Blockchain({ blocks: sortedBlocks });
  }

  private static validateSortedBlocks(genesisBlockService: GenesisBlockService, blocks: Block[]): void {
    if (!blocks.length) {
      throw new OperationNotValidError({
        reason: 'Blocks array is empty.',
      });
    }

    const firstBlock = blocks[0] as Block;

    if (!genesisBlockService.checkIfBlockIsGenesisBlock(firstBlock)) {
      throw new OperationNotValidError({
        reason: 'First block is not a genesis block.',
      });
    }

    for (let i = 1; i < blocks.length; i++) {
      const currentBlock = blocks[i] as Block;

      const previousBlock = blocks[i - 1] as Block;

      if (currentBlock.index !== previousBlock.index + 1) {
        throw new OperationNotValidError({
          reason: 'Blocks are not consecutive.',
          blockIndex: currentBlock.index,
          indexFromPreviousBlock: previousBlock.index,
        });
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        throw new OperationNotValidError({
          reason: 'Blocks do not form a valid chain.',
          blockPreviousHash: currentBlock.previousHash,
          hashFromPreviousBlock: previousBlock.hash,
        });
      }
    }
  }
}
