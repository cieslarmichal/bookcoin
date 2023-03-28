import { Schema } from '../../../../../libs/validator/schema.js';
import { SchemaType } from '../../../../../libs/validator/schemaType.js';

export const addBlockToBlockchainCommandHandlerPayloadSchema = Schema.object({
  blockData: Schema.string(),
});

export type AddBlockToBlockchainCommandHandlerPayload = SchemaType<
  typeof addBlockToBlockchainCommandHandlerPayloadSchema
>;
