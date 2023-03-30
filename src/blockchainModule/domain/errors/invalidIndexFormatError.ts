import { DomainError } from '../../../common/errors/domainError.js';

interface Context {
  readonly index: number;
}

export class InvalidIndexFormatError extends DomainError<Context> {
  public constructor(context: Context) {
    super('InvalidIndexFormatError', 'Invalid index format. Index should be integer greater or equal zero.', context);
  }
}
