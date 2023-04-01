import { DomainEvent } from './domainEvent';

export interface DomainEventHandler<Event extends DomainEvent> {
  onEvent(event: Event): Promise<void>;
}
