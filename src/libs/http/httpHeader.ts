import { HttpHeader } from '../../common/http/httpHeader.js';
import { Schema } from '../validator/schema.js';
import { SchemaType } from '../validator/schemaType.js';

export const headersSchema = Schema.object({
  [HttpHeader.contentType]: Schema.string().optional(),
  [HttpHeader.accept]: Schema.string().optional(),
}).passthrough();

export type Headers = SchemaType<typeof headersSchema>;
