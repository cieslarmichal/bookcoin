import { ApplicationError } from '../../../common/errors/applicationError.js';

interface Context {
  readonly hash: string;
  readonly validHash: string;
}

export class InvalidBlockHashError extends ApplicationError<Context> {
  public constructor(context: Context) {
    super('InvalidBlockHashError', 'Invalid block hash.', context);
  }
}
