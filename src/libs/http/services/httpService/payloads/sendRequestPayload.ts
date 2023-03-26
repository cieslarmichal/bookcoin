import { HttpMethodName } from '../../../../../common/http/httpMethodName.js';
import { Schema } from '../../../../validator/schema.js';
import { SchemaType } from '../../../../validator/schemaType.js';

export const sendRequestPayloadSchema = Schema.object({
  endpoint: Schema.string().optional(),
  headers: Schema.record(Schema.string(), Schema.string()).optional(),
  queryParams: Schema.record(Schema.string(), Schema.string()).optional(),
  body: Schema.any().optional(),
  method: Schema.enum(HttpMethodName),
});

export type SendRequestPayload = SchemaType<typeof sendRequestPayloadSchema>;
