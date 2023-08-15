import { CommandHandler } from '../../../../common/types/commandHandler.js';
import { CreateBlockchainCommandHandlerResult } from './payloads/createBlockchainCommandHandlerResult.js';

export type CreateBlockchainCommandHandler = CommandHandler<void, CreateBlockchainCommandHandlerResult>;
