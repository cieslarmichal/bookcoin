import { SHA256 } from 'crypto-js';

import { Schema } from '../../../../libs/validator/schema.js';
import { SchemaType } from '../../../../libs/validator/schemaType.js';
import { Validator } from '../../../../libs/validator/validator.js';

export const blockInputSchema = Schema.object({
  index: Schema.number(),
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

  public constructor(input: BlockInput) {
    const { index, previousHash, timestamp, data } = Validator.validate(blockInputSchema, input);

    this.index = index;
    this.hash = this.calculateHash();
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
  }

  private calculateHash(): string {
    return SHA256(String(this.index) + this.previousHash + String(this.timestamp) + this.data).toString();
  }
}
