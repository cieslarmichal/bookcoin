import { Schema } from '../../../../../libs/validator/schema.js';
import { SchemaType } from '../../../../../libs/validator/schemaType.js';

export const createBlockPayloadSchema = Schema.object({
  previousIndex: Schema.number(),
  previousHash: Schema.string(),
  data: Schema.string(),
});

export type CreateBlockPayload = SchemaType<typeof createBlockPayloadSchema>;
