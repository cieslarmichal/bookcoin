import { UniqueId } from '../uniqueId';

export interface DomainEvent {
  readonly name: string;
  readonly occuredDate: Date;

  getAggregateId(): UniqueId;
}
