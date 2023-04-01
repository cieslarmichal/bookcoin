import { DomainEvent } from '../../../../common/domain/events/domainEvent';
import { Schema } from '../../../../libs/validator/schema';
import { SchemaType } from '../../../../libs/validator/schemaType';
import { Validator } from '../../../../libs/validator/validator';

export const blockAddedToBlockchainEventInputSchema = Schema.object({
  occuredDate: Schema.date(),
});

export type BlockAddedToBlockchainEventInput = SchemaType<typeof blockAddedToBlockchainEventInputSchema>;

export class BlockAddedToBlockchainEvent extends DomainEvent {
  public override readonly eventName = BlockAddedToBlockchainEvent.name;

  public constructor(input: BlockAddedToBlockchainEventInput) {
    const { occuredDate } = Validator.validate(blockAddedToBlockchainEventInputSchema, input);

    super(occuredDate);
  }
}
