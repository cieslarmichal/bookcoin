import { CreateBlockchainPayload, createBlockchainSchema } from './payloads/createBlockchainPayload.js';
import { Schema } from '../../../../libs/validator/schema.js';
import { SchemaType } from '../../../../libs/validator/schemaType.js';
import { Validator } from '../../../../libs/validator/validator.js';
import { InvalidBlocksError } from '../../errors/invalidBlocksError.js';
import { BlockchainService } from '../../services/blockchainService/blockchainService.js';
import { Block } from '../block/block.js';

export const blockchainInputSchema = Schema.object({
  blocks: Schema.array(Schema.custom<Block>((data) => data instanceof Block)),
});

export type BlockchainInput = SchemaType<typeof blockchainInputSchema>;

export class Blockchain {
  private blocks: Block[];

  private constructor(input: BlockchainInput) {
    const { blocks } = Validator.validate(blockchainInputSchema, input);

    this.blocks = blocks;
  }

  public getLastBlock(): Block {
    return this.blocks.at(-1) as Block;
  }

  public addBlock(blockchainService: BlockchainService, newBlock: Block): void {
    const previousBlock = this.getLastBlock();

    const newBlockIsValid = blockchainService.checkIfNewBlockIsValid({ newBlock, previousBlock });

    if (!newBlockIsValid) {
      return;
    }

    this.blocks.push(newBlock);

    // TODO: broadcast event
  }

  public replaceBlocks(blockchainService: BlockchainService, newBlocks: Block[]): void {
    const newBlocksAreValid = blockchainService.checkIfBlocksAreValid({ blocks: newBlocks });

    const newBlocksAreLongerThanCurrentBlocks = newBlocks.length > this.blocks.length;

    if (newBlocksAreValid && newBlocksAreLongerThanCurrentBlocks) {
      this.blocks = newBlocks;

      // TODO: broadcast event
    }
  }

  public static createBlockchain(input: CreateBlockchainPayload): Blockchain {
    const { blockchainService, blocks } = Validator.validate(createBlockchainSchema, input);

    const blocksAreValid = blockchainService.checkIfBlocksAreValid({ blocks });

    if (!blocksAreValid) {
      throw new InvalidBlocksError({ blocks });
    }

    return new Blockchain({ blocks });
  }
}
