import { type Static, Type } from '@sinclair/typebox';

import { blockDTOSchema } from './blockDTO.js';

export const addBlockToBlockchainRequestBodySchema = Type.Object({
  blockData: Type.String(),
});

export type AddBlockToBlockchainRequestBody = Static<typeof addBlockToBlockchainRequestBodySchema>;

export const addBlockToBlockchainResponseBodySchema = Type.Object({
  data: Type.Array(blockDTOSchema),
});

export type AddBlockToBlockchainResponseBody = Static<typeof addBlockToBlockchainResponseBodySchema>;
