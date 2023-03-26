import { Schema } from '../../../../libs/validator/schema.js';
import { SchemaType } from '../../../../libs/validator/schemaType.js';
import { Validator } from '../../../../libs/validator/validator.js';
import { BlockchainService } from '../../services/blockchainService/blockchainService.js';
import { BlockService } from '../../services/blockService/blockService.js';
import { Block } from '../block/block.js';

export const blockchainInputSchema = Schema.object({
  genesisBlock: Schema.instanceof(Block),
});

export type BlockchainInput = SchemaType<typeof blockchainInputSchema>;

export class Blockchain {
  private blocks: Block[];

  public constructor(input: BlockchainInput) {
    const { genesisBlock } = Validator.validate(blockchainInputSchema, input);

    this.blocks = [genesisBlock];
  }

  public getLastBlock(): Block {
    return this.blocks.at(-1) as Block;
  }

  public addBlock(blockService: BlockService, newBlock: Block): void {
    const previousBlock = this.getLastBlock();

    const newBlockIsValid = blockService.checkIfNewBlockIsValid({ newBlock, previousBlock });

    if (!newBlockIsValid) {
      return;
    }

    this.blocks.push(newBlock);

    // TODO: broadcast event
  }

  public replaceBlocks(blockchainService: BlockchainService, newBlocks: Block[]): void {
    const newBlocksAreValid = blockchainService.checkIfBlocksAreValid({ blocks });

    const newBlocksAreLongerThanCurrentBlocks = newBlocks.length > this.blocks.length;

    if (newBlocksAreValid && newBlocksAreLongerThanCurrentBlocks) {
      this.blocks = newBlocks;

      // TODO: broadcast event
    }
  }
}
