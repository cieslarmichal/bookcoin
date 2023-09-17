import { blockchainSchema } from './blockchainSchema.js';
import { ValidationSchema } from '../../../../../common/validation/validationSchema.js';
import { ValidationSchemaType } from '../../../../../common/validation/validationSchemaType.js';

export const findBlocksFromBlockchainResponseOkBodySchema = ValidationSchema.object({
  data: blockchainSchema,
});

export type FindBlocksFromBlockchainResponseOkBody = ValidationSchemaType<
  typeof findBlocksFromBlockchainResponseOkBodySchema
>;
