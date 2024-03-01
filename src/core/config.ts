import { type Static, Type } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import appConfig from 'config';

const configSchema = Type.Object({
  logLevel: Type.String({ minLength: 1 }),
  httpPort: Type.Integer(),
  p2pPort: Type.Integer(),
});

export const config = Value.Decode(configSchema, appConfig);

export type Config = Static<typeof configSchema>;
