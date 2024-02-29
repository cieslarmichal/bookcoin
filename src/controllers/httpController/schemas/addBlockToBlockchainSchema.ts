import { type Static, Type } from '@sinclair/typebox';

export const addBlockToBlockchainRequestBodySchema = Type.Object({
  blockData: Type.String(),
});

export type AddBlockToBlockchainRequestBody = Static<typeof addBlockToBlockchainRequestBodySchema>;

export const addBlockToBlockchainResponseBodySchema = Type.Object({
  data: Type.String(),
});

export interface AddBlockToBlockchainResponseBody {
  data: Type.Array(blockDTOSchema);
}
