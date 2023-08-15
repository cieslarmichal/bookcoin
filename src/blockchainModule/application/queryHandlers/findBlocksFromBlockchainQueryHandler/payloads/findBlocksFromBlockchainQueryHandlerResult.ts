import { Schema } from '../../../../../libs/validator/schema.js';
import { SchemaType } from '../../../../../libs/validator/schemaType.js';
import { Block } from '../../../../domain/valueObjects/block/block.js';

export const findBlocksFromBlockchainQueryHandlerResultSchema = Schema.object({
  blocks: Schema.array(Schema.custom<Block>((data) => data instanceof Block)),
});

export type FindBlocksFromBlockchainQueryHandlerResult = SchemaType<
  typeof findBlocksFromBlockchainQueryHandlerResultSchema
>;
