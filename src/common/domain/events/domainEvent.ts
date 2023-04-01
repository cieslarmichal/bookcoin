export abstract class DomainEvent {
  public abstract readonly eventName: string;
  public readonly occurredDate: Date;

  public constructor(occuredDate: Date) {
    this.occurredDate = occuredDate;
  }
}
