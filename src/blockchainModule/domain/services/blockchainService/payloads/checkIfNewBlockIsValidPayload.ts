import { Schema } from '../../../../../libs/validator/schema.js';
import { SchemaType } from '../../../../../libs/validator/schemaType.js';
import { Block } from '../../../entities/block/block.js';

export const checkIfNewBlockIsValidPayloadSchema = Schema.object({
  newBlock: Schema.custom<Block>((data) => data instanceof Block),
  previousBlock: Schema.custom<Block>((data) => data instanceof Block),
});

export type CheckIfNewBlockIsValidPayload = SchemaType<typeof checkIfNewBlockIsValidPayloadSchema>;
