import { Schema } from '../../../../validator/schema.js';
import { SchemaType } from '../../../../validator/schemaType.js';

export const fetchPayloadSchema = Schema.object({
  url: Schema.string(),
  init: Schema.any().optional(),
});

export type FetchPayload = SchemaType<typeof fetchPayloadSchema>;
