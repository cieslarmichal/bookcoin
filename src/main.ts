import 'reflect-metadata';

import dotenv from 'dotenv';

import { EnvKey } from './envKey';

async function main(): Promise<void> {
  dotenv.config();

  const logLevel = process.env[EnvKey.logLevel];
  const httpHost = process.env[EnvKey.httpHost];
  const httpPort = Number(process.env[EnvKey.httpPort]);

  console.log({
    logLevel,
    httpHost,
    httpPort,
  });
}

main();
