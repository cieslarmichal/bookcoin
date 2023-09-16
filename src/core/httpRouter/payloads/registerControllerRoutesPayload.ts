import { HttpController } from '../../../common/types/http/httpController.js';
import { ValidationSchema } from '../../../common/validation/validationSchema.js';
import { ValidationSchemaType } from '../../../common/validation/validationSchemaType.js';

export const registerControllerRoutesPayloadSchema = ValidationSchema.object({
  controller: ValidationSchema.unsafeType<HttpController>(),
});

export type RegisterControllerRoutesPayload = ValidationSchemaType<typeof registerControllerRoutesPayloadSchema>;
