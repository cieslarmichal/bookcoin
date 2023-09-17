import { DomainEvent } from '../../../../common/types/domain/events/domainEvent.js';
import { UniqueId } from '../../../../common/types/domain/uniqueId.js';
import { Blockchain } from '../../entities/blockchain/blockchain.js';

export interface BlockAddedToBlockchainEventDraft {
  readonly blockchain: Blockchain;
}

export class BlockAddedToBlockchainEvent implements DomainEvent {
  public readonly name: string;
  public readonly occuredDate: Date;
  public readonly blockchain: Blockchain;

  public constructor(draft: BlockAddedToBlockchainEventDraft) {
    const { blockchain } = draft;

    this.name = BlockAddedToBlockchainEvent.name;
    this.occuredDate = new Date();
    this.blockchain = blockchain;
  }

  public getAggregateId(): UniqueId {
    return this.blockchain.id;
  }
}
