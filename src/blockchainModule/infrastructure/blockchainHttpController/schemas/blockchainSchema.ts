import { blockSchema } from './blockSchema.js';
import { Schema } from '../../../../libs/validator/schema.js';

export const blockchainSchema = Schema.object({
  blocks: Schema.array(blockSchema),
});
