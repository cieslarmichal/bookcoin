import { Schema } from '../../../../../libs/validator/schema.js';
import { SchemaType } from '../../../../../libs/validator/schemaType.js';
import { GenesisBlockService } from '../../../services/genesisBlockService/genesisBlockService.js';
import { Block } from '../../../valueObjects/block/block.js';

export const createBlockchainSchema = Schema.object({
  genesisBlockService: Schema.unsafeType<GenesisBlockService>(),
  blocks: Schema.array(Schema.custom<Block>((data) => data instanceof Block)),
});

export type CreateBlockchainPayload = SchemaType<typeof createBlockchainSchema>;
