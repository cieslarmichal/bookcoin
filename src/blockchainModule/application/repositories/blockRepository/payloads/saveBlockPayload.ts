import { Schema } from '../../../../../libs/validator/schema.js';
import { SchemaType } from '../../../../../libs/validator/schemaType.js';
import { Block } from '../../../../domain/entities/block/block.js';

export const saveBlockPayloadSchema = Schema.object({
  block: Schema.instanceof(Block),
});

export type SaveBlockPayload = SchemaType<typeof saveBlockPayloadSchema>;
