import { ApplicationError } from '../../../common/errors/applicationError.js';

interface Context {
  readonly index: number;
}

export class InvalidIndexFormatError extends ApplicationError<Context> {
  public constructor(context: Context) {
    super('InvalidIndexFormatError', 'Invalid index format. Index should be integer greater or equal zero.', context);
  }
}
