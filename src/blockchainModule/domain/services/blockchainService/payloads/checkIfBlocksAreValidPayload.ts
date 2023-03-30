import { Schema } from '../../../../../libs/validator/schema.js';
import { SchemaType } from '../../../../../libs/validator/schemaType.js';
import { Block } from '../../../entities/block/block.js';

export const checkIfBlocksAreValidPayloadSchema = Schema.object({
  blocks: Schema.array(Schema.custom<Block>((data) => data instanceof Block)),
});

export type CheckIfBlocksAreValidPayload = SchemaType<typeof checkIfBlocksAreValidPayloadSchema>;
