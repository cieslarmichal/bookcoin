import { DomainError } from '../../../common/validation/errors/domainError.js';

export class BlocksNotProvidedInBlockchainError extends DomainError<void> {
  public constructor() {
    super('BlocksNotProvidedInBlockchainError', 'No blocks provided in blockchain.');
  }
}
