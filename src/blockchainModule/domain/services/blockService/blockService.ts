import { SHA256 } from 'crypto-js';

import { CalculateBlockHashPayload, calculateBlockHashPayloadSchema } from './payloads/calculateBlockHashPayload.js';
import {
  CheckIfBlockHashIsValidPayload,
  checkIfBlockHashIsValidPayloadSchema,
} from './payloads/checkIfBlockHashIsValidPayload.js';
import {
  CheckIfBlockIsGenesisBlockPayload,
  checkIfBlockIsGenesisBlockPayloadSchema,
} from './payloads/checkIfBlockIsGenesisBlockPayload.js';
import {
  CheckIfNewBlockIsValidPayload,
  checkIfNewBlockIsValidPayloadSchema,
} from './payloads/checkIfNewBlockIsValidPayload.js';
import { CreateBlockPayload, createBlockPayloadSchema } from './payloads/createBlockPayload.js';
import { Validator } from '../../../../libs/validator/validator.js';
import { Block } from '../../entities/block/block.js';
import { InvalidPreviousIndexFormatError } from '../../errors/invalidPreviousIndexFormatError.js';
import { PreviousHashNotProvidedError } from '../../errors/previousHashNotProvidedError.js';

export class BlockService {
  private readonly genesisBlockInfo = {
    index: 0,
    hash: '816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7',
    previousHash: '',
    timestamp: 1465154705,
    data: 'Genesis block',
  };

  public createGenesisBlock(): Block {
    return new Block(this.genesisBlockInfo);
  }

  public checkIfBlockIsGenesisBlock(input: CheckIfBlockIsGenesisBlockPayload): boolean {
    const {
      block: { index, hash, previousHash, timestamp, data },
    } = Validator.validate(checkIfBlockIsGenesisBlockPayloadSchema, input);

    return (
      index === this.genesisBlockInfo.index &&
      hash === this.genesisBlockInfo.hash &&
      previousHash === this.genesisBlockInfo.previousHash &&
      timestamp === this.genesisBlockInfo.timestamp &&
      data === this.genesisBlockInfo.data
    );
  }

  public createBlock(input: CreateBlockPayload): Block {
    const { previousIndex, previousHash, data } = Validator.validate(createBlockPayloadSchema, input);

    if (!previousHash) {
      throw new PreviousHashNotProvidedError();
    }

    if (!Number.isInteger(previousIndex) || previousIndex < 0) {
      throw new InvalidPreviousIndexFormatError({ previousIndex });
    }

    const index = previousIndex + 1;

    const timestamp = new Date().getTime() / 1000;

    const hash = this.calculateBlockHash({ index, timestamp, previousHash, data });

    return new Block({ index, hash, previousHash, timestamp, data });
  }

  public calculateBlockHash(input: CalculateBlockHashPayload): string {
    const { index, previousHash, timestamp, data } = Validator.validate(calculateBlockHashPayloadSchema, input);

    return SHA256(String(index) + previousHash + String(timestamp) + data).toString();
  }

  public checkIfNewBlockIsValid(input: CheckIfNewBlockIsValidPayload): boolean {
    const { newBlock, previousBlock } = Validator.validate(checkIfNewBlockIsValidPayloadSchema, input);

    if (newBlock.index !== previousBlock.index + 1) {
      console.log({
        message: 'Index does not match incremented index from last block in blockchain',
        newBlockIndex: newBlock.index,
        previousBlockIndex: previousBlock.index,
      });

      return false;
    }

    if (previousBlock.hash !== newBlock.previousHash) {
      console.log({
        message: 'Previous hash does not match hash from last block in blockchain',
        newBlockPreviousHash: newBlock.previousHash,
        previousBlockHash: previousBlock.hash,
      });

      return false;
    }

    return this.checkIfBlockHashIsValid({ block: newBlock });
  }

  public checkIfBlockHashIsValid(input: CheckIfBlockHashIsValidPayload): boolean {
    const {
      block: { index, hash, previousHash, timestamp, data },
    } = Validator.validate(checkIfBlockHashIsValidPayloadSchema, input);

    const validHash = this.calculateBlockHash({ index, previousHash, timestamp, data });

    return hash !== validHash;
  }
}
