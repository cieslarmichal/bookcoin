import { HttpRoute } from '../../../common/types/http/httpRoute.js';
import { ValidationSchema } from '../../../common/validation/validationSchema.js';
import { ValidationSchemaType } from '../../../common/validation/validationSchemaType.js';

export const registerRoutesPayloadSchema = ValidationSchema.object({
  routes: ValidationSchema.array(ValidationSchema.instanceof(HttpRoute)),
  basePath: ValidationSchema.string(),
});

export type RegisterRoutesPayload = ValidationSchemaType<typeof registerRoutesPayloadSchema>;
