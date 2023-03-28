import { blockchainSchema } from './blockchainSchema.js';
import { Schema } from '../../../../../libs/validator/schema.js';
import { SchemaType } from '../../../../../libs/validator/schemaType.js';

export const findBlockchainQueryParametersSchema = Schema.object({
  id: Schema.string(),
});

export type FindBlockchainQueryParameters = SchemaType<typeof findBlockchainQueryParametersSchema>;

export const findBlockchainResponseOkBodySchema = Schema.object({
  data: blockchainSchema,
});

export type FindBlockchainResponseOkBody = SchemaType<typeof findBlockchainResponseOkBodySchema>;
