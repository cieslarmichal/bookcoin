import { SaveBlockPayload } from './payloads/saveBlockPayload.js';
import { Block } from '../../../domain/entities/block/block.js';

export interface BlockRepository {
  findBlocks(): Promise<Block[]>;
  saveBlock(input: SaveBlockPayload): Promise<void>;
}
