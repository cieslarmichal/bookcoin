import {
  CheckIfBlocksAreValidPayload,
  checkIfBlocksAreValidPayloadSchema,
} from './payloads/checkIfBlocksAreValidPayload.js';
import {
  CheckIfNewBlockIsValidPayload,
  checkIfNewBlockIsValidPayloadSchema,
} from './payloads/checkIfNewBlockIsValidPayload.js';
import { Validator } from '../../../../libs/validator/validator.js';
import { Block } from '../../entities/block/block.js';
import { BlockService } from '../blockService/blockService.js';

export class BlockchainService {
  public constructor(private readonly blockService: BlockService) {}

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
}
