import { Schema } from '../../../../../libs/validator/schema.js';
import { SchemaType } from '../../../../../libs/validator/schemaType.js';
import { Block } from '../../../../domain/entities/block/block.js';

export const addBlockToBlockchainCommandHandlerResultSchema = Schema.object({
  blocks: Schema.array(Schema.custom<Block>((data) => data instanceof Block)),
});

export type AddBlockToBlockchainCommandHandlerResult = SchemaType<
  typeof addBlockToBlockchainCommandHandlerResultSchema
>;
