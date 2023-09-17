import { DomainError } from '../../../common/validation/errors/domainError.js';

export class PreviousHashNotProvidedError extends DomainError<void> {
  public constructor() {
    super('PreviousHashNotProvidedError', 'Previous hash not provided.');
  }
}
