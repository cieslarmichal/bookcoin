import { Schema } from '../../../../../libs/validator/schema.js';
import { SchemaType } from '../../../../../libs/validator/schemaType.js';

export const calculateHashPayloadSchema = Schema.object({
  index: Schema.number(),
  previousHash: Schema.string(),
  timestamp: Schema.number(),
  data: Schema.string(),
});

export type CalculateHashPayload = SchemaType<typeof calculateHashPayloadSchema>;
