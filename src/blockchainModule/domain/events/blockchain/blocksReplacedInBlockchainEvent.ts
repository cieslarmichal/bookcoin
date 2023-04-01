import { DomainEvent } from '../../../../common/domain/events/domainEvent';
import { Schema } from '../../../../libs/validator/schema';
import { SchemaType } from '../../../../libs/validator/schemaType';
import { Validator } from '../../../../libs/validator/validator';

export const blocksReplacedInBlockchainEventInputSchema = Schema.object({
  occuredDate: Schema.date(),
});

export type BlocksReplacedInBlockchainEventInput = SchemaType<typeof blocksReplacedInBlockchainEventInputSchema>;

export class BlocksReplacedInBlockchainEvent extends DomainEvent {
  public override readonly eventName = BlocksReplacedInBlockchainEvent.name;

  public constructor(input: BlocksReplacedInBlockchainEventInput) {
    const { occuredDate } = Validator.validate(blocksReplacedInBlockchainEventInputSchema, input);

    super(occuredDate);
  }
}
