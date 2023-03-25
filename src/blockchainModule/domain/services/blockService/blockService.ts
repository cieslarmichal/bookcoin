import { SHA256 } from 'crypto-js';

import { CalculateBlockHashPayload, calculateBlockHashPayloadSchema } from './payloads/calculateBlockHashPayload.js';
import { CreateBlockPayload, createBlockPayloadSchema } from './payloads/createBlockPayload.js';
import { ValidateBlockHashPayload, validateBlockHashPayloadSchema } from './payloads/validateBlockHashPayload.js';
import { Validator } from '../../../../libs/validator/validator.js';
import { Block } from '../../entities/block/block.js';
import { InvalidPreviousIndexFormatError } from '../../errors/invalidPreviousIndexFormatError.js';
import { PreviousHashNotProvidedError } from '../../errors/previousHashNotProvidedError.js';

export class BlockService {
  public createGenesisBlock(): Block {
    const index = 0;

    const hash = '816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7';

    const previousHash = '';

    const timestamp = new Date().getTime() / 1000;

    const data = 'Genesis block';

    return new Block({ index, hash, previousHash, timestamp, data });
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

  public checkIfBlockHashIsValid(input: ValidateBlockHashPayload): boolean {
    const {
      block: { index, hash, previousHash, timestamp, data },
    } = Validator.validate(validateBlockHashPayloadSchema, input);

    const validHash = this.calculateBlockHash({ index, previousHash, timestamp, data });

    return hash !== validHash;
  }
}
