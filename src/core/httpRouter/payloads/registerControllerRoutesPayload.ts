import { HttpController } from '../../../common/types/http/httpController.js';
import { Schema } from '../../../common/validation/schema.js';
import { SchemaType } from '../../../common/validation/schemaType.js';

export const registerControllerRoutesPayloadSchema = Schema.object({
  controller: Schema.unsafeType<HttpController>(),
});

export type RegisterControllerRoutesPayload = SchemaType<typeof registerControllerRoutesPayloadSchema>;
