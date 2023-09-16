import { ApplicationError } from '../../../common/validation/errors/applicationError.js';

export class BlockchainAlreadyExistsError extends ApplicationError<void> {
  public constructor() {
    super('BlockchainAlreadyExistsError', 'Blockchain already exists.');
  }
}
