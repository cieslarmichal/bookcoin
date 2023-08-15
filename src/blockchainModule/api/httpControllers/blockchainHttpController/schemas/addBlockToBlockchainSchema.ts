import { Schema } from '../../../../../libs/validator/schema.js';
import { SchemaType } from '../../../../../libs/validator/schemaType.js';
import { blockchainSchema } from './blockchainSchema.js';

export const addBlockToBlockchainBodySchema = Schema.object({
  blockData: Schema.string(),
});

export type AddBlockToBlockchainBody = SchemaType<typeof addBlockToBlockchainBodySchema>;

export const addBlockToBlockchainResponseOkBodySchema = Schema.object({
  data: blockchainSchema,
});

export type AddBlockToBlockchainResponseOkBody = SchemaType<typeof addBlockToBlockchainResponseOkBodySchema>;
