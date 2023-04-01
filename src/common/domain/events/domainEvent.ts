export abstract class DomainEvent {
  public readonly name: string;
  public readonly occurredDate: Date;

  public constructor(name: string, occuredDate: Date) {
    this.name = name;
    this.occurredDate = occuredDate;
  }
}
