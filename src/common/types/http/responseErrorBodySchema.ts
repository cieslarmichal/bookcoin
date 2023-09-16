import { ValidationSchema } from '../../validation/validationSchema.js';
import { ValidationSchemaType } from '../../validation/validationSchemaType.js';

export const responseErrorBodySchema = ValidationSchema.object({
  error: ValidationSchema.object({
    name: ValidationSchema.string(),
    message: ValidationSchema.string(),
    context: ValidationSchema.record(ValidationSchema.string(), ValidationSchema.any()).optional(),
  }),
});

export type ResponseErrorBody = ValidationSchemaType<typeof responseErrorBodySchema>;
