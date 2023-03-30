import { Schema } from '../../../../../libs/validator/schema.js';
import { SchemaType } from '../../../../../libs/validator/schemaType.js';
import { BlockchainService } from '../../../services/blockchainService/blockchainService.js';
import { Block } from '../../block/block.js';

export const createBlockchainSchema = Schema.object({
  blockchainService: Schema.unsafeType<BlockchainService>(),
  blocks: Schema.array(Schema.custom<Block>((data) => data instanceof Block)),
});

export type CreateBlockchainPayload = SchemaType<typeof createBlockchainSchema>;
