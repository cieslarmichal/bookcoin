import { ApplicationError } from '../../../common/errors/applicationError.js';

export class BlockchainNotFoundError extends ApplicationError<void> {
  public constructor() {
    super('BlockchainNotFoundError', 'Blockchain not found.');
  }
}
