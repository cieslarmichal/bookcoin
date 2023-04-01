import { DomainEventHandler } from '../../../../common/domain/events/domainEventHandler';
import { DomainEvents } from '../../../../common/domain/events/domainEvents';
import { BlockAddedToBlockchainEvent } from '../../../domain/events/blockchain/blockAddedToBlockchainEvent';

export class BlockAddedToBlockchainSubscriber extends DomainEventHandler<BlockAddedToBlockchainEvent> {
  public override setupSubscriptions(): void {
    DomainEvents.register(this.onEvent.bind(this), BlockAddedToBlockchainEvent.name);
  }

  protected override async onEvent(event: BlockAddedToBlockchainEvent): Promise<void> {
    const { blockchain } = event;

    console.log({ blockchain });
  }
}
