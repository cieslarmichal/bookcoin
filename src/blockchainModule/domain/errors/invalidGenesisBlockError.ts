import { ApplicationError } from '../../../common/errors/applicationError.js';

interface Context {
  readonly index: number;
  readonly hash: string;
  readonly previousHash: string;
  readonly timestamp: number;
  readonly data: string;
}

export class InvalidGenesisBlockError extends ApplicationError<Context> {
  public constructor(context: Context) {
    super('InvalidGenesisBlockError', 'Invalid genesis block.', context);
  }
}
