import { DomainError } from '../../../common/validation/errors/domainError.js';

interface Context {
  readonly index: number;
  readonly hash: string;
  readonly previousHash: string;
  readonly timestamp: number;
  readonly data: string;
}

export class InvalidGenesisBlockError extends DomainError<Context> {
  public constructor(context: Context) {
    super('InvalidGenesisBlockError', 'Invalid genesis block.', context);
  }
}
