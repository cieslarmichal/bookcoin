import { DomainEventHandler } from '../../../../common/types/domain/events/domainEventHandler.js';
import { DomainEvents } from '../../../../common/types/domain/events/domainEvents.js';
import { BlockAddedToBlockchainEvent } from '../../../domain/events/blockchain/blockAddedToBlockchainEvent.js';

export class BlockAddedToBlockchainSubscriber extends DomainEventHandler<BlockAddedToBlockchainEvent> {
  public override setupSubscriptions(): void {
    DomainEvents.register(this.onEvent.bind(this), BlockAddedToBlockchainEvent.name);
  }

  protected override async onEvent(event: BlockAddedToBlockchainEvent): Promise<void> {
    const { blockchain } = event;

    console.log({ blockchain });
  }
}
