import { Entity } from './entity';
import { DomainEvent } from './events/domainEvent';
import { UniqueId } from './uniqueId';

export abstract class AggregateRoot<T> extends Entity<T> {
  private domainEvents: DomainEvent[] = [];

  public get id(): UniqueId {
    return this.id;
  }

  public get events(): DomainEvent[] {
    return this.domainEvents;
  }

  protected addDomainEvent(domainEvent: DomainEvent): void {
    this.domainEvents.push(domainEvent);

    // DomainEvents.markAggregateForDispatch(this);

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
