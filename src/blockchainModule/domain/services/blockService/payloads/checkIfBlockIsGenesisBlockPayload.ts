import { Schema } from '../../../../../libs/validator/schema.js';
import { SchemaType } from '../../../../../libs/validator/schemaType.js';
import { Block } from '../../../entities/block/block.js';

export const checkIfBlockIsGenesisBlockPayloadSchema = Schema.object({
  block: Schema.instanceof(Block),
});

export type CheckIfBlockIsGenesisBlockPayload = SchemaType<typeof checkIfBlockIsGenesisBlockPayloadSchema>;
