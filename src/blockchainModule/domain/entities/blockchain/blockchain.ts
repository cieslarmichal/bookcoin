import { Schema } from '../../../../libs/validator/schema.js';
import { SchemaType } from '../../../../libs/validator/schemaType.js';
import { Validator } from '../../../../libs/validator/validator.js';
import { Block } from '../block/block.js';

export const blockchainInputSchema = Schema.object({
  genesisBlock: Schema.instanceof(Block),
});

export type BlockchainInput = SchemaType<typeof blockchainInputSchema>;

export class Blockchain {
  public blockchain: Block[];

  public constructor(input: BlockchainInput) {
    const { genesisBlock } = Validator.validate(blockchainInputSchema, input);

    this.blockchain = [genesisBlock];
  }
}
