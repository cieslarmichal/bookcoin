import { CommandHandler } from '../../../../common/types/commandHandler.js';
import { Block } from '../../../domain/valueObjects/block/block.js';

export interface AddBlockToBlockchainCommandHandlerPayload {
  readonly blockData: string;
}

export interface AddBlockToBlockchainCommandHandlerResult {
  readonly blocks: Block[];
}

export type AddBlockToBlockchainCommandHandler = CommandHandler<
  AddBlockToBlockchainCommandHandlerPayload,
  AddBlockToBlockchainCommandHandlerResult
>;
