import { DomainError } from '../../../common/validation/errors/domainError.js';

export class GenesisBlockNotProvidedInBlockchainError extends DomainError<void> {
  public constructor() {
    super('GenesisBlockNotProvidedInBlockchainError', 'Genesis block not provided in blockchain.');
  }
}
