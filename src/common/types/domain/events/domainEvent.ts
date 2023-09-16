import { UniqueId } from '../uniqueId.js';

export interface DomainEvent {
  readonly name: string;
  readonly occuredDate: Date;

  getAggregateId(): UniqueId;
}
