import { DomainEvent } from '../../../../common/types/domain/events/domainEvent.js';
import { UniqueId } from '../../../../common/types/domain/uniqueId.js';
import { Blockchain } from '../../entities/blockchain/blockchain.js';

export interface BlocksReplacedInBlockchainEventDraft {
  readonly blockchain: Blockchain;
}

export class BlocksReplacedInBlockchainEvent implements DomainEvent {
  public readonly name: string;
  public readonly occuredDate: Date;
  public readonly blockchain: Blockchain;

  public constructor(draft: BlocksReplacedInBlockchainEventDraft) {
    const { blockchain } = draft;

    this.name = BlocksReplacedInBlockchainEvent.name;
    this.occuredDate = new Date();
    this.blockchain = blockchain;
  }

  public getAggregateId(): UniqueId {
    return this.blockchain.id;
  }
}
