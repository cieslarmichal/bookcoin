import { Schema } from '../../../../../libs/validator/schema.js';
import { SchemaType } from '../../../../../libs/validator/schemaType.js';
import { GenesisBlockService } from '../../../services/genesisBlockService/genesisBlockService.js';

export const createBlockSchema = Schema.object({
  genesisBlockService: Schema.unsafeType<GenesisBlockService>(),
  index: Schema.number(),
  hash: Schema.string().optional(),
  previousHash: Schema.string(),
  timestamp: Schema.number().optional(),
  data: Schema.string(),
});

export type CreateBlockPayload = SchemaType<typeof createBlockSchema>;
