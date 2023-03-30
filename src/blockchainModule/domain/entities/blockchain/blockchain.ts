import { CreateBlockchainPayload, createBlockchainSchema } from './payloads/createBlockchainPayload.js';
import { Schema } from '../../../../libs/validator/schema.js';
import { SchemaType } from '../../../../libs/validator/schemaType.js';
import { Validator } from '../../../../libs/validator/validator.js';
import { InvalidBlocksError } from '../../errors/invalidBlocksError.js';
import { BlockchainService } from '../../services/blockchainService/blockchainService.js';
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

  public replaceBlocks(blockchainService: BlockchainService, newBlocks: Block[]): void {
    const newBlocksAreValid = blockchainService.checkIfBlocksAreValid({ blocks: newBlocks });

    const newBlocksAreLongerThanCurrentBlocks = newBlocks.length > this.blocks.length;

    if (newBlocksAreValid && newBlocksAreLongerThanCurrentBlocks) {
      this.blocks = newBlocks;

      // TODO: broadcast event
    }
  }

  public checkIfBlocksAreValid(input: CheckIfBlocksAreValidPayload): boolean {
    const { blocks } = Validator.validate(checkIfBlocksAreValidPayloadSchema, input);

    if (!blocks.length) {
      return false;
    }

    const firstBlock = blocks[0] as Block;

    if (!this.blockService.checkIfBlockIsGenesisBlock({ block: firstBlock })) {
      return false;
    }

    for (let i = 1; i < blocks.length; i++) {
      if (!this.checkIfNewBlockIsValid({ newBlock: blocks[i] as Block, previousBlock: blocks[i - 1] as Block })) {
        return false;
      }
    }

    return true;
  }

  public checkIfNewBlockIsValid(input: CheckIfNewBlockIsValidPayload): boolean {
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
    const { blocks } = Validator.validate(createBlockchainSchema, input);

    const blocksAreValid = blockchainService.checkIfBlocksAreValid({ blocks });

    if (!blocksAreValid) {
      throw new InvalidBlocksError({ blocks });
    }

    return new Blockchain({ blocks });
  }
}
