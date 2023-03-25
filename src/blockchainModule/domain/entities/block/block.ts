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
  public index: number;
  public previousHash: string;
  public timestamp: number;
  public data: string;

  public constructor(input: BlockInput) {
    const { index, previousHash, timestamp, data } = Validator.validate(blockInputSchema, input);

    this.index = index;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;

    this.hash = hash;
  }

  private calculateHash(): string {
    CryptoJS.SHA256(String(this.index) + this.previousHash + String(this.timestamp) + this.data).toString();
  }
}
