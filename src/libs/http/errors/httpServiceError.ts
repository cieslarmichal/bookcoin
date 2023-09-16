import { ApplicationError } from '../../../common/validation/errors/applicationError.js';

interface Context {
  readonly name?: string;
  readonly message: string;
}

export class HttpServiceError extends ApplicationError<Context> {
  public constructor(context: Context) {
    super('HttpServiceError', 'Http service error.', context);
  }
}
