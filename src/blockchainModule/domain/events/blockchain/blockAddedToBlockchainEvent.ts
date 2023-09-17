import { DomainEvent } from '../../../../common/domain/events/domainEvent';
import { UniqueId } from '../../../../common/domain/uniqueId';
import { Schema } from '../../../../libs/validator/schema';
import { SchemaType } from '../../../../libs/validator/schemaType';
import { Validator } from '../../../../libs/validator/validator';
import { Blockchain } from '../../entities/blockchain/blockchain';

export const blockAddedToBlockchainEventInputSchema = Schema.object({
  blockchain: Schema.custom<Blockchain>((data) => data instanceof Blockchain),
});

export type BlockAddedToBlockchainEventInput = SchemaType<typeof blockAddedToBlockchainEventInputSchema>;

export class BlockAddedToBlockchainEvent implements DomainEvent {
  public readonly name: string;
  public readonly occuredDate: Date;
  public readonly blockchain: Blockchain;

  public constructor(payload: BlockAddedToBlockchainEventInput) {
    const { blockchain } = Validator.validate(blockAddedToBlockchainEventInputSchema, payload);

    this.name = BlockAddedToBlockchainEvent.name;
    this.occuredDate = new Date();
    this.blockchain = blockchain;
  }

  public getAggregateId(): UniqueId {
    return this.blockchain.id;
  }
}
