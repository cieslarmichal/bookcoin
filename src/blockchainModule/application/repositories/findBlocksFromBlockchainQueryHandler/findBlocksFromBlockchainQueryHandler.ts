import { FindBlocksFromBlockchainQueryHandlerResult } from './payloads/findBlocksFromBlockchainQueryHandlerResult.js';
import { QueryHandler } from '../../../../common/types/queryHandler.js';

export type FindBlocksFromBlockchainQueryHandler = QueryHandler<void, FindBlocksFromBlockchainQueryHandlerResult>;
