import { SHA256 } from 'crypto-js';

import { genesisBlockData } from './genesisBlockData.js';
import { CreateBlockPayload, createBlockSchema } from './payloads/createBlockPayload.js';
import { Schema } from '../../../../libs/validator/schema.js';
import { SchemaType } from '../../../../libs/validator/schemaType.js';
import { Validator } from '../../../../libs/validator/validator.js';
import { InvalidBlockHashError } from '../../errors/invalidBlockHashError.js';
import { InvalidIndexFormatError } from '../../errors/invalidIndexFormatError.js';
import { PreviousHashNotProvidedError } from '../../errors/previousHashNotProvidedError.js';

export const blockInputSchema = Schema.object({
  index: Schema.number(),
  hash: Schema.string(),
  previousHash: Schema.string(),
  timestamp: Schema.number(),
  data: Schema.string(),
});

export type BlockInput = SchemaType<typeof blockInputSchema>;

export class Block {
  public readonly index: number;
  public readonly hash: string;
  public readonly previousHash: string;
  public readonly timestamp: number;
  public readonly data: string;

  private constructor(input: BlockInput) {
    const { index, hash, previousHash, timestamp, data } = Validator.validate(blockInputSchema, input);

    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
  }

  public checkIfBlockIsGenesisBlock(): boolean {
    return (
      this.index === genesisBlockData.index &&
      this.hash === genesisBlockData.hash &&
      this.previousHash === genesisBlockData.previousHash &&
      this.timestamp === genesisBlockData.timestamp &&
      this.data === genesisBlockData.data
    );
  }

  public static createBlock(input: CreateBlockPayload): Block {
    const payload = Validator.validate(createBlockSchema, input);

    if (!payload.previousHash) {
      throw new PreviousHashNotProvidedError();
    }

    if (!Number.isInteger(payload.index) || payload.index < 0) {
      throw new InvalidIndexFormatError({ index: payload.index });
    }

    const timestamp = payload.timestamp ? payload.timestamp : new Date().getTime() / 1000;

    const validHash = SHA256(
      String(payload.index) + payload.previousHash + String(timestamp) + payload.data,
    ).toString();

    if (payload.hash && payload.hash !== validHash) {
      throw new InvalidBlockHashError({ hash: payload.hash, validHash });
    }

    return new Block({
      index: payload.index,
      hash: validHash,
      previousHash: payload.previousHash,
      timestamp,
      data: payload.data,
    });
  }
}
