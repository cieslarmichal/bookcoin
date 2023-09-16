import { CommandHandler } from '../../../../common/types/commandHandler.js';
import { Block } from '../../../domain/valueObjects/block/block.js';

export interface CreateBlockchainCommandHandlerResult {
  readonly blocks: Block[];
}

export type CreateBlockchainCommandHandler = CommandHandler<void, CreateBlockchainCommandHandlerResult>;
