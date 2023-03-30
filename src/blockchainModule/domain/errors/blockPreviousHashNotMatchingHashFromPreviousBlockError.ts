import { DomainError } from '../../../common/errors/domainError.js';

interface Context {
  readonly blockPreviousHash: string;
  readonly hashFromPreviousBlock: string;
}

export class BlockPreviousHashNotMatchingHashFromPreviousBlockError extends DomainError<Context> {
  public constructor(context: Context) {
    super(
      'BlockPreviousHashNotMatchingHashFromPreviousBlockError',
      `Block's previous hash does not match hash from previous block.`,
      context,
    );
  }
}
