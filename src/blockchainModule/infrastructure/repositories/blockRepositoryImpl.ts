import { Validator } from '../../../libs/validator/validator.js';
import { BlockRepository } from '../../application/repositories/blockRepository/blockRepository.js';
import {
  SaveBlockPayload,
  saveBlockPayloadSchema,
} from '../../application/repositories/blockRepository/payloads/saveBlockPayload.js';
import { Block } from '../../domain/entities/block/block.js';

export class BlockRepositoryImpl implements BlockRepository {
  private blocks: Block[] = [];

  public async findBlocks(): Promise<Block[]> {
    return this.blocks.sort((block1, block2) => block1.index - block2.index);
  }

  public async saveBlock(input: SaveBlockPayload): Promise<void> {
    const { block } = Validator.validate(saveBlockPayloadSchema, input);

    this.blocks.push(block);
  }
}
