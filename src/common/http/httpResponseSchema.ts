import { Schema } from '../../libs/validator/schema.js';
import { SchemaType } from '../../libs/validator/schemaType.js';
import { ZodSchema } from '../../libs/validator/zodSchema.js';

export const httpResponseSchemaSchema = Schema.object({
  bodySchema: Schema.unsafeType<ZodSchema>(),
});

export type HttpResponseSchema = SchemaType<typeof httpResponseSchemaSchema>;
