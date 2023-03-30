import { Schema } from '../../../../../libs/validator/schema.js';
import { SchemaType } from '../../../../../libs/validator/schemaType.js';

export const checkIfBlockIsGenesisBlockPayloadSchema = Schema.object({
  index: Schema.number(),
  hash: Schema.string(),
  previousHash: Schema.string(),
  timestamp: Schema.number(),
  data: Schema.string(),
});

export type CheckIfBlockIsGenesisBlockPayload = SchemaType<typeof checkIfBlockIsGenesisBlockPayloadSchema>;
