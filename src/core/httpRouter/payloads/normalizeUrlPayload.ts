import { ValidationSchema } from '../../../common/validation/validationSchema.js';
import { ValidationSchemaType } from '../../../common/validation/validationSchemaType.js';

export const normalizeUrlPayloadSchema = ValidationSchema.object({
  url: ValidationSchema.string(),
});

export type NormalizeUrlPayload = ValidationSchemaType<typeof normalizeUrlPayloadSchema>;
