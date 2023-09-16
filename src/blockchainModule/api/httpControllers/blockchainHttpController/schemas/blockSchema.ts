import { ValidationSchema } from '../../../../../common/validation/validationSchema.js';

export const blockSchema = ValidationSchema.object({
  index: ValidationSchema.number(),
  hash: ValidationSchema.string(),
  previousHash: ValidationSchema.string(),
  timestamp: ValidationSchema.number(),
  data: ValidationSchema.string(),
});
