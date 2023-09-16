import { QueryHandler } from '../../../../common/types/queryHandler.js';
import { Block } from '../../../domain/valueObjects/block/block.js';

export interface FindBlocksFromBlockchainQueryHandlerResult {
  readonly blocks: Block[];
}

export type FindBlocksFromBlockchainQueryHandler = QueryHandler<void, FindBlocksFromBlockchainQueryHandlerResult>;
