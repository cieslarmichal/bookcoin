import { DomainEvent } from '../../../../common/domain/events/domainEvent';
import { UniqueId } from '../../../../common/domain/uniqueId';
import { Schema } from '../../../../libs/validator/schema';
import { SchemaType } from '../../../../libs/validator/schemaType';
import { Validator } from '../../../../libs/validator/validator';
import { Blockchain } from '../../entities/blockchain/blockchain';

export const blocksReplacedInBlockchainEventInputSchema = Schema.object({
  blockchain: Schema.custom<Blockchain>((data) => data instanceof Blockchain),
});

export type BlocksReplacedInBlockchainEventInput = SchemaType<typeof blocksReplacedInBlockchainEventInputSchema>;

export class BlocksReplacedInBlockchainEvent implements DomainEvent {
  public readonly name: string;
  public readonly occuredDate: Date;
  public readonly blockchain: Blockchain;

  public constructor(input: BlocksReplacedInBlockchainEventInput) {
    const { blockchain } = Validator.validate(blocksReplacedInBlockchainEventInputSchema, input);

    this.name = BlocksReplacedInBlockchainEvent.name;
    this.occuredDate = new Date();
    this.blockchain = blockchain;
  }

  public getAggregateId(): UniqueId {
    return this.blockchain.id;
  }
}
