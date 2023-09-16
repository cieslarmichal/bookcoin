import { Schema } from '../../validation/schema.js';
import { SchemaType } from '../../validation/schemaType.js';

export const responseErrorBodySchema = Schema.object({
  error: Schema.object({
    name: Schema.string(),
    message: Schema.string(),
    context: Schema.record(Schema.string(), Schema.any()).optional(),
  }),
});

export type ResponseErrorBody = SchemaType<typeof responseErrorBodySchema>;
