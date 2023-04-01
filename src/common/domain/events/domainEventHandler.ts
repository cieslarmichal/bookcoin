import { DomainEvent } from './domainEvent';

export abstract class DomainEventHandler<Event extends DomainEvent> {
  public abstract setupSubscriptions(): void;
  protected abstract onEvent(event: Event): Promise<void>;
}
