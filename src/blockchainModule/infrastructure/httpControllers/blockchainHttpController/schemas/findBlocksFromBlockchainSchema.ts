import { blockchainSchema } from './blockchainSchema.js';
import { Schema } from '../../../../../libs/validator/schema.js';
import { SchemaType } from '../../../../../libs/validator/schemaType.js';

export const findBlocksFromBlockchainResponseOkBodySchema = Schema.object({
  data: blockchainSchema,
});

export type FindBlocksFromBlockchainResponseOkBody = SchemaType<typeof findBlocksFromBlockchainResponseOkBodySchema>;
