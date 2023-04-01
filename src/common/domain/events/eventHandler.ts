import { DomainEvent } from './domainEvent';

export interface EventHandler<Event extends DomainEvent> {
  onEvent(event: Event): Promise<void>;
}
