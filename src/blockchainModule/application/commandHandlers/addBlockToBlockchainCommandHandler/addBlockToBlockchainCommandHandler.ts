import { AddBlockToBlockchainCommandHandlerPayload } from './payloads/addBlockToBlockchainCommandHandlerPayload.js';
import { CommandHandler } from '../../../../common/types/commandHandler.js';

export type AddBlockToBlockchainCommandHandler = CommandHandler<AddBlockToBlockchainCommandHandlerPayload, void>;
