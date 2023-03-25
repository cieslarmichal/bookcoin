import { ApplicationError } from '../../../common/errors/applicationError.js';

interface Context {
  readonly previousIndex: number;
}

export class InvalidPreviousIndexFormatError extends ApplicationError<Context> {
  public constructor(context: Context) {
    super(
      'InvalidPreviousIndexFormatError',
      'Invalid previous index format. Previous index should be integer greater or equal zero.',
      context,
    );
  }
}
