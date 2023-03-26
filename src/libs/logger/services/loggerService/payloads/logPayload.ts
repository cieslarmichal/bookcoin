import { Schema } from '../../../../validator/schema.js';
import { SchemaType } from '../../../../validator/schemaType.js';
import { LogContext } from '../../../logContext.js';

export const logPayloadSchema = Schema.object({
  message: Schema.string(),
  context: Schema.unsafeType<LogContext>().optional(),
});

export type LogPayload = SchemaType<typeof logPayloadSchema>;
