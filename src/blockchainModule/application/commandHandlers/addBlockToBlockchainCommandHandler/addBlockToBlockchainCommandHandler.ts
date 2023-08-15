import { AddBlockToBlockchainCommandHandlerPayload } from './payloads/addBlockToBlockchainCommandHandlerPayload.js';
import { CommandHandler } from '../../../../common/types/commandHandler.js';
import { AddBlockToBlockchainCommandHandlerResult } from './payloads/addBlockToBlockchainCommandHandlerResult.js';

export type AddBlockToBlockchainCommandHandler = CommandHandler<
  AddBlockToBlockchainCommandHandlerPayload,
  AddBlockToBlockchainCommandHandlerResult
>;
