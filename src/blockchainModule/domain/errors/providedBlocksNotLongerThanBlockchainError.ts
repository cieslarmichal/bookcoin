import { DomainError } from '../../../common/validation/errors/domainError.js';

interface Context {
  readonly providedBlocksSize: number;
  readonly blockchainSize: number;
}

export class ProvidedBlocksNotLongerThanBlockchainError extends DomainError<Context> {
  public constructor(context: Context) {
    super('ProvidedBlocksNotLongerThanBlockchainError', 'Provided blocks are not longer than blockchain.', context);
  }
}
