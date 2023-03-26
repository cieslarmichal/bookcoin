import { Schema } from '../../../validator/schema.js';
import { SchemaType } from '../../../validator/schemaType.js';
import { headersSchema } from '../../httpHeader.js';

export const httpServiceConfigSchema = Schema.object({
  baseUrl: Schema.string(),
  headers: headersSchema.optional(),
});

export type HttpServiceConfig = SchemaType<typeof httpServiceConfigSchema>;
