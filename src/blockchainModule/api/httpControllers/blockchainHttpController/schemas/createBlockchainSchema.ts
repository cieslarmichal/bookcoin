import { ValidationSchema } from '../../../../../common/validation/validationSchema.js';
import { ValidationSchemaType } from '../../../../../common/validation/validationSchemaType.js';
import { blockchainSchema } from './blockchainSchema.js';

export const createBlockchainResponseCreatedBodySchema = ValidationSchema.object({
  data: blockchainSchema,
});

export type CreateBlockchainResponseCreatedBody = ValidationSchemaType<
  typeof createBlockchainResponseCreatedBodySchema
>;
