import { Type } from '@sinclair/typebox';

export const blockDTOSchema = Type.Object({
  index: Type.Number(),
  hash: Type.String(),
  previousHash: Type.String(),
  timestamp: Type.Number(),
  data: Type.String(),
});
