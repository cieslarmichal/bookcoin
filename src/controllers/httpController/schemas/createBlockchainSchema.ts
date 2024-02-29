import { Type, type Static } from '@sinclair/typebox';

import { blockDTOSchema } from './blockDTO.js';

export const createBlockchainResponseBodySchema = Type.Object({
  data: Type.Array(blockDTOSchema),
});

export type CreateBlockchainResponseBody = Static<typeof createBlockchainResponseBodySchema>;
