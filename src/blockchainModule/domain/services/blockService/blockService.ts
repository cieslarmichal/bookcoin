import { SHA256 } from 'crypto-js';

import { CalculateHashPayload, calculateHashPayloadSchema } from './payloads/calculateHashPayload.js';
import { CreateBlockPayload, createBlockPayloadSchema } from './payloads/createBlockPayload.js';
import { Validator } from '../../../../libs/validator/validator.js';
import { Block } from '../../entities/block/block.js';

export class BlockService {
  public createBlock(input: CreateBlockPayload): Block {
    const { previousIndex, previousHash, data } = Validator.validate(createBlockPayloadSchema, input);

    const index = previousIndex + 1;

    const timestamp = new Date().getTime() / 1000;

    const hash = this.calculateHash({ index, timestamp, previousHash, data });

    return new Block({ index, hash, previousHash, timestamp, data });
  }

  public calculateHash(input: CalculateHashPayload): string {
    const { index, previousHash, timestamp, data } = Validator.validate(calculateHashPayloadSchema, input);

    return SHA256(String(index) + previousHash + String(timestamp) + data).toString();
  }
}
