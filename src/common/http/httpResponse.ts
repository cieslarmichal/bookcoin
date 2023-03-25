import { HttpStatusCode } from './httpStatusCode.js';
import { Schema } from '../../libs/validator/schema.js';
import { SchemaType } from '../../libs/validator/schemaType.js';

export const httpResponseSchema = Schema.object({
  statusCode: Schema.enum(HttpStatusCode),
  body: Schema.unknown().optional(),
});

export type HttpResponse = SchemaType<typeof httpResponseSchema>;
