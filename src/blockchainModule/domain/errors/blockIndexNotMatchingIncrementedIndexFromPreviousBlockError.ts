import { DomainError } from '../../../common/validation/errors/domainError.js';

interface Context {
  readonly blockIndex: number;
  readonly indexFromPreviousBlock: number;
}

export class BlockIndexNotMatchingIncrementedIndexFromPreviousBlockError extends DomainError<Context> {
  public constructor(context: Context) {
    super(
      'BlockIndexNotMatchingIncrementedIndexFromPreviousBlockError',
      `Block's index does not match incremented index from previous block.`,
      context,
    );
  }
}
