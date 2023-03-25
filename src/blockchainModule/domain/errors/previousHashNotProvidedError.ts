import { ApplicationError } from '../../../common/errors/applicationError.js';

export class PreviousHashNotProvidedError extends ApplicationError<void> {
  public constructor() {
    super('PreviousHashNotProvidedError', 'Previous hash not provided.');
  }
}
