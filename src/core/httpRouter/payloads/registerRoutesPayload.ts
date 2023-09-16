import { HttpRoute } from '../../../common/types/http/httpRoute.js';
import { Schema } from '../../../common/validation/schema.js';
import { SchemaType } from '../../../common/validation/schemaType.js';

export const registerRoutesPayloadSchema = Schema.object({
  routes: Schema.array(Schema.instanceof(HttpRoute)),
  basePath: Schema.string(),
});

export type RegisterRoutesPayload = SchemaType<typeof registerRoutesPayloadSchema>;
