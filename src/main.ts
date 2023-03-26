import dotenv from 'dotenv';
import express, { json } from 'express';

import { EnvKey } from './envKey.js';
import { LogLevel } from './libs/logger/logLevel.js';

async function main(): Promise<void> {
  dotenv.config();

  const logLevel = process.env[EnvKey.logLevel] as LogLevel;
  const httpHost = process.env[EnvKey.httpHost];
  const httpPort = Number(process.env[EnvKey.httpPort]);
  const peerToPeerPort = Number(process.env[EnvKey.peerToPeerPort]);

  console.log({
    logLevel,
    httpHost,
    httpPort,
    peerToPeerPort,
  });

  const app = express();

  app.use(json());

  app.get('/blocks', (req, res) => {
    res.send(getBlockchain());
  });

  app.post('/mineBlock', (req, res) => {
    const newBlock: Block = generateNextBlock(req.body.data);
    res.send(newBlock);
  });

  app.get('/peers', (req, res) => {
    res.send(getSockets().map((s: any) => s._socket.remoteAddress + ':' + s._socket.remotePort));
  });

  app.post('/addPeer', (req, res) => {
    connectToPeers(req.body.peer);
    res.send();
  });

  app.listen(httpPort, httpHost, () => {
    console.log('Listening http on port: ' + myHttpPort);
  });
}

main();
