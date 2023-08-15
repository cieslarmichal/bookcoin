import { Schema } from '../../../../../libs/validator/schema.js';
import { SchemaType } from '../../../../../libs/validator/schemaType.js';
import { blockchainSchema } from './blockchainSchema.js';

export const createBlockchainResponseCreatedBodySchema = Schema.object({
  data: blockchainSchema,
});

export type CreateBlockchainResponseCreatedBody = SchemaType<typeof createBlockchainResponseCreatedBodySchema>;
