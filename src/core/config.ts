import { type Static, Type } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import appConfig from 'config';

const configSchema = Type.Object({
  logLevel: Type.String({ minLength: 1 }),
  httpPort: Type.Integer(),
  p2pPort: Type.Integer(),
  genesisBlock: Type.Object({
    index: Type.Integer(),
    hash: Type.String(),
    previousHash: Type.String(),
    timestamp: Type.Integer(),
    data: Type.String(),
  }),
});

export const config = Value.Decode(configSchema, appConfig);

export type Config = Static<typeof configSchema>;
