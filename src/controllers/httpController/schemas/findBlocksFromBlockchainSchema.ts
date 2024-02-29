import { Type, type Static } from '@sinclair/typebox';

import { blockDTOSchema } from './blockDTO.js';

export const findBlocksFromBlockchainResponseBodySchema = Type.Object({
  data: Type.Array(blockDTOSchema),
});

export type FindBlocksFromBlockchainResponseBody = Static<typeof findBlocksFromBlockchainResponseBodySchema>;
