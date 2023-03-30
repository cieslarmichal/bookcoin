import { ApplicationError } from '../../../common/errors/applicationError.js';
import { Block } from '../entities/block/block.js';

interface Context {
  readonly blocks: Block[];
}

export class InvalidBlocksError extends ApplicationError<Context> {
  public constructor(context: Context) {
    super('InvalidBlocksError', 'Invalid blocks.', context);
  }
}
