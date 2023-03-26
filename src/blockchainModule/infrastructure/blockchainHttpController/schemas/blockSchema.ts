import { Schema } from '../../../../libs/validator/schema.js';

export const blockSchema = Schema.object({
  index: Schema.number(),
  hash: Schema.string(),
  previousHash: Schema.string(),
  timestamp: Schema.number(),
  data: Schema.string(),
});
