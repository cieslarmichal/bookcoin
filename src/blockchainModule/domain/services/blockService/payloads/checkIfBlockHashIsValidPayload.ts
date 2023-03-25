import { Schema } from '../../../../../libs/validator/schema.js';
import { SchemaType } from '../../../../../libs/validator/schemaType.js';
import { Block } from '../../../entities/block/block.js';

export const checkIfBlockHashIsValidPayloadSchema = Schema.object({
  block: Schema.instanceof(Block),
});

export type CheckIfBlockHashIsValidPayload = SchemaType<typeof checkIfBlockHashIsValidPayloadSchema>;
