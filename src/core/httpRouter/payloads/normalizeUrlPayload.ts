import { Schema } from '../../../common/validation/schema.js';
import { SchemaType } from '../../../common/validation/schemaType.js';

export const normalizeUrlPayloadSchema = Schema.object({
  url: Schema.string(),
});

export type NormalizeUrlPayload = SchemaType<typeof normalizeUrlPayloadSchema>;
