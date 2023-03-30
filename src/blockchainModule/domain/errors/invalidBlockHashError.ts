import { DomainError } from '../../../common/errors/domainError.js';

interface Context {
  readonly hash: string;
  readonly validHash: string;
}

export class InvalidBlockHashError extends DomainError<Context> {
  public constructor(context: Context) {
    super('InvalidBlockHashError', 'Invalid block hash.', context);
  }
}
