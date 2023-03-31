import { Schema } from '../../../../../libs/validator/schema.js';
import { SchemaType } from '../../../../../libs/validator/schemaType.js';
import { Blockchain } from '../../../../domain/entities/blockchain/blockchain.js';

export const saveBlockchainPayloadSchema = Schema.object({
  blockchain: Schema.custom<Blockchain>((data) => data instanceof Blockchain),
});

export type SaveBlockchainPayload = SchemaType<typeof saveBlockchainPayloadSchema>;
