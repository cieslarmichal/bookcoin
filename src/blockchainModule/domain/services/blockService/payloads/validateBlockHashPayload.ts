import { Schema } from '../../../../../libs/validator/schema.js';
import { SchemaType } from '../../../../../libs/validator/schemaType.js';
import { Block } from '../../../entities/block/block.js';

export const validateBlockHashPayloadSchema = Schema.object({
  block: Schema.instanceof(Block),
});

export type ValidateBlockHashPayload = SchemaType<typeof validateBlockHashPayloadSchema>;
