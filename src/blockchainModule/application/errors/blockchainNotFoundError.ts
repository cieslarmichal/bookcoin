import { ApplicationError } from '../../../common/validation/errors/applicationError.js';

export class BlockchainNotFoundError extends ApplicationError<void> {
  public constructor() {
    super('BlockchainNotFoundError', 'Blockchain not found.');
  }
}
