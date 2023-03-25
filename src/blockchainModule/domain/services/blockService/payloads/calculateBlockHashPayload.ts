import { Schema } from '../../../../../libs/validator/schema.js';
import { SchemaType } from '../../../../../libs/validator/schemaType.js';

export const calculateBlockHashPayloadSchema = Schema.object({
  index: Schema.number(),
  previousHash: Schema.string(),
  timestamp: Schema.number(),
  data: Schema.string(),
});

export type CalculateBlockHashPayload = SchemaType<typeof calculateBlockHashPayloadSchema>;
