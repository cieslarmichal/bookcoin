import { DomainEvent } from './domainEvent';
import { AggregateRoot } from '../aggregateRoot';
import { UniqueId } from '../uniqueId';

type RegisterEventCallback = (event: DomainEvent) => Promise<void>;

export class DomainEvents {
  private static eventToHandlersMapping: Record<string, RegisterEventCallback[]> = {};
  private static markedAggregates: AggregateRoot<unknown>[] = [];

  public static register(callback: RegisterEventCallback, eventName: string): void {
    if (!this.eventToHandlersMapping[eventName]) {
      this.eventToHandlersMapping[eventName] = [];
    }

    (this.eventToHandlersMapping[eventName] as RegisterEventCallback[]).push(callback);
  }

  public static markAggregateForDispatch(aggregate: AggregateRoot<unknown>): void {
    const foundAggregate = this.markedAggregates.find((aggregate) => aggregate.id.equals(aggregate.id));

    if (!foundAggregate) {
      this.markedAggregates.push(aggregate);
    }
  }

  public static clearHandlers(): void {
    this.eventToHandlersMapping = {};
  }

  public static clearMarkedAggregates(): void {
    this.markedAggregates = [];
  }

  public static async dispatchEventsForAggregate(id: UniqueId): Promise<void> {
    const foundAggregate = this.markedAggregates.find((aggregate) => aggregate.id.equals(id));

    if (foundAggregate) {
      this.dispatchAggregateEvents(foundAggregate);

      foundAggregate.clearEvents();

      this.removeAggregateFromMarkedAggregates(foundAggregate);
    }
  }

  private static async dispatchAggregateEvents(aggregate: AggregateRoot<unknown>): Promise<void> {
    await Promise.all(
      aggregate.events.map(async (event) => {
        const eventHandlers = this.eventToHandlersMapping[event.eventName];

        if (!eventHandlers) {
          return;
        }

        await Promise.all(
          eventHandlers.map(async (eventHandler) => {
            await eventHandler(event);
          }),
        );
      }),
    );
  }

  private static removeAggregateFromMarkedAggregates(aggregate: AggregateRoot<unknown>): void {
    const foundIndex = this.markedAggregates.findIndex((markedAggregate) => markedAggregate.equals(aggregate));

    this.markedAggregates.splice(foundIndex, 1);
  }
}
