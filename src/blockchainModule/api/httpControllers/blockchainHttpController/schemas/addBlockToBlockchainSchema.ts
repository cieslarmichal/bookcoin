import { ValidationSchema } from '../../../../../common/validation/validationSchema.js';
import { ValidationSchemaType } from '../../../../../common/validation/validationSchemaType.js';
import { blockchainSchema } from './blockchainSchema.js';

export const addBlockToBlockchainBodySchema = ValidationSchema.object({
  blockData: ValidationSchema.string(),
});

export type AddBlockToBlockchainBody = ValidationSchemaType<typeof addBlockToBlockchainBodySchema>;

export const addBlockToBlockchainResponseOkBodySchema = ValidationSchema.object({
  data: blockchainSchema,
});

export type AddBlockToBlockchainResponseOkBody = ValidationSchemaType<typeof addBlockToBlockchainResponseOkBodySchema>;
