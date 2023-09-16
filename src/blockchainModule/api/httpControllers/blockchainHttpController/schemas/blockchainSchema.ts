import { ValidationSchema } from '../../../../../common/validation/validationSchema.js';
import { blockSchema } from './blockSchema.js';

export const blockchainSchema = ValidationSchema.object({
  blocks: ValidationSchema.array(blockSchema),
});
