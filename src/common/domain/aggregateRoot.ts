import { Entity } from './entity';
import { DomainEvent } from './events/domainEvent';
import { DomainEvents } from './events/domainEvents';

export abstract class AggregateRoot<T> extends Entity<T> {
  private domainEvents: DomainEvent[] = [];

  public get events(): DomainEvent[] {
    return this.domainEvents;
  }

  protected addDomainEvent(domainEvent: DomainEvent): void {
    this.domainEvents.push(domainEvent);

    DomainEvents.markAggregateForDispatch(this);

    this.logDomainEventAdded(domainEvent);
  }

  public clearEvents(): void {
    this.domainEvents = [];
  }

  private logDomainEventAdded(domainEvent: DomainEvent): void {
    const thisClass = Reflect.getPrototypeOf(this) as object;

    const domainEventClass = Reflect.getPrototypeOf(domainEvent) as object;

    console.info(`[Domain Event Created]:`, thisClass.constructor.name, '==>', domainEventClass.constructor.name);
  }
}
