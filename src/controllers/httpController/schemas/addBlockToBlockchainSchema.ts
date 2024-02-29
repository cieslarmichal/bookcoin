import { ValidationSchema } from '../../../../../common/validation/validationSchema.js';
import { ValidationSchemaType } from '../../../../../common/validation/validationSchemaType.js';
import { blockchainDto } from './blockchainDto.js';

export const addBlockToBlockchainBodySchema = ValidationSchema.object({
  blockData: ValidationSchema.string(),
});

export type AddBlockToBlockchainBody = ValidationSchemaType<typeof addBlockToBlockchainBodySchema>;

export const addBlockToBlockchainResponseOkBodySchema = ValidationSchema.object({});

export interface AddBlockToBlockchainResponseOkBody {
  data: blockchainDto;
}
