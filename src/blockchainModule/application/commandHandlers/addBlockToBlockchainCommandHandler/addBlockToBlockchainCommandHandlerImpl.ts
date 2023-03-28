import { AddBlockToBlockchainCommandHandler } from './addBlockToBlockchainCommandHandler.js';
import {
  AddBlockToBlockchainCommandHandlerPayload,
  addBlockToBlockchainCommandHandlerPayloadSchema,
} from './payloads/addBlockToBlockchainCommandHandlerPayload.js';
import { Validator } from '../../../../libs/validator/validator.js';
import { Inject } from '../../../../libs/dependencyInjection/decorators.js';
import { blockchainModuleSymbols } from '../../../blockchainModuleSymbols.js';

export class AddBlockToBlockchainCommandHandlerImpl implements AddBlockToBlockchainCommandHandler {
  public constructor(@Inject(blockchainModuleSymbols.blockRepository))
  public async execute(input: AddBlockToBlockchainCommandHandlerPayload): Promise<void> {
    const { blockData } = Validator.validate(addBlockToBlockchainCommandHandlerPayloadSchema, input);

  }
}
