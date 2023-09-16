import { blockchainSchema } from './blockchainSchema.js';

export const createBlockchainResponseCreatedBodySchema = Schema.object({
  data: blockchainSchema,
});

export type CreateBlockchainResponseCreatedBody = SchemaType<typeof createBlockchainResponseCreatedBodySchema>;
