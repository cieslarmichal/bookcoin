import { Schema } from '../../libs/validator/schema.js';
import { SchemaType } from '../../libs/validator/schemaType.js';
import { ZodSchema } from '../../libs/validator/zodSchema.js';

export const httpRequestSchemaSchema = Schema.object({
  bodySchema: Schema.unsafeType<ZodSchema>().optional(),
  queryParamsSchema: Schema.unsafeType<ZodSchema>().optional(),
});

export type HttpRequestSchema = SchemaType<typeof httpRequestSchemaSchema>;
