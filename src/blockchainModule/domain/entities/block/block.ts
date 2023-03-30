import { SHA256 } from 'crypto-js';

import { CreateBlockPayload, createBlockSchema } from './payloads/createBlockPayload.js';
import { Schema } from '../../../../libs/validator/schema.js';
import { SchemaType } from '../../../../libs/validator/schemaType.js';
import { Validator } from '../../../../libs/validator/validator.js';
import { InvalidBlockHashError } from '../../errors/invalidBlockHashError.js';
import { InvalidGenesisBlockError } from '../../errors/invalidGenesisBlockError.js';
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

  public static createBlock(input: CreateBlockPayload): Block {
    const { genesisBlockService, index, hash, previousHash, timestamp, data } = Validator.validate(
      createBlockSchema,
      input,
    );

    if (index === 0) {
      const blockIsGenesisBlock = genesisBlockService.checkIfBlockIsGenesisBlock({
        index,
        hash: hash as string,
        previousHash,
        timestamp: timestamp as number,
        data,
      });

      if (!blockIsGenesisBlock) {
        throw new InvalidGenesisBlockError({
          index,
          hash: hash as string,
          previousHash,
          timestamp: timestamp as number,
          data,
        });
      }

      return new Block({
        index,
        hash: hash as string,
        previousHash,
        timestamp: timestamp as number,
        data,
      });
    }

    if (!Number.isInteger(index) || index < 0) {
      throw new InvalidIndexFormatError({ index });
    }

    if (!previousHash) {
      throw new PreviousHashNotProvidedError();
    }

    const actualTimestamp = timestamp ?? new Date().getTime() / 1000;

    const validHash = SHA256(String(index) + previousHash + String(timestamp) + data).toString();

    if (hash && hash !== validHash) {
      throw new InvalidBlockHashError({ hash, validHash });
    }

    return new Block({ index, hash: validHash, previousHash, timestamp: actualTimestamp, data });
  }
}
