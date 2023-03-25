import { Schema } from '../../../../libs/validator/schema.js';
import { SchemaType } from '../../../../libs/validator/schemaType.js';
import { Validator } from '../../../../libs/validator/validator.js';
import { BlockchainService } from '../../services/blockchainService/blockchainService.js';
import { Block } from '../block/block.js';

export const blockchainInputSchema = Schema.object({
  genesisBlock: Schema.instanceof(Block),
});

export type BlockchainInput = SchemaType<typeof blockchainInputSchema>;

export class Blockchain {
  public readonly genesisBlock: Block;
  private blocks: Block[];

  public constructor(input: BlockchainInput) {
    const { genesisBlock } = Validator.validate(blockchainInputSchema, input);

    this.genesisBlock = genesisBlock;
    this.blocks = [genesisBlock];
  }

  public getBlocks(): Block[] {
    return this.blocks;
  }

  public addBlock(blockchainService: BlockchainService, block: Block): void {
    blockchainService.validateNewBlock(block);

    this.blocks.push(block);
  }
}
