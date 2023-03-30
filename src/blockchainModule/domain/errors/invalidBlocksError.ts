import { DomainError } from '../../../common/errors/domainError.js';
import { Block } from '../entities/block/block.js';

interface Context {
  readonly blocks: Block[];
}

export class InvalidBlocksError extends DomainError<Context> {
  public constructor(context: Context) {
    super('InvalidBlocksError', 'Invalid blocks.', context);
  }
}
