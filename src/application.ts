import 'reflect-metadata';

import 'dotenv/config';

import { fastify } from 'fastify';

import { BlockchainModule } from './blockchainModule/blockchainModule.js';
import { EnvKey } from './envKey.js';
import { DependencyInjectionContainer } from './libs/dependencyInjection/dependencyInjectionContainer.js';
import { DependencyInjectionContainerFactory } from './libs/dependencyInjection/dependencyInjectionContainerFactory.js';
import { LoggerModule } from './libs/logger/loggerModule.js';
import { loggerModuleSymbols } from './libs/logger/loggerModuleSymbols.js';
import { LogLevel } from './libs/logger/logLevel.js';
import { LoggerService } from './libs/logger/services/loggerService/loggerService.js';
import { BlockAddedToBlockchainSubscriber } from './blockchainModule/application/subscribers/blockAddedToBlockchainSubscriber/blockAddedToBlockchainSubscriber.js';
import { HttpRouter } from './core/httpRouter/httpRouter.js';
import { PeerToPeerWebSocketServerImpl } from './core/p2p/peerToPeerWebSocketServerImpl.js';
import { WebSocketController } from './blockchainModule/api/webSocketController/webSocketController.js';
import { blockchainModuleSymbols } from './blockchainModule/blockchainModuleSymbols.js';

export class Application {
  public static createContainer(): DependencyInjectionContainer {
    const logLevel = process.env[EnvKey.logLevel] as LogLevel;

    const container = DependencyInjectionContainerFactory.create({
      modules: [new LoggerModule({ logLevel }), new BlockchainModule()],
    });

    return container;
  }

  public static async start(): Promise<void> {
    const server = fastify();

    const httpServerHost = String(process.env[EnvKey.httpServerHost]);
    const httpServerPort = Number(process.env[EnvKey.httpServerPort]);
    const peerToPeerPort = Number(process.env[EnvKey.peerToPeerPort]);

    console.log({
      httpServerHost,
      httpServerPort,
      peerToPeerPort,
    });

    const container = Application.createContainer();

    const httpRouter = new HttpRouter(server, container);

    httpRouter.registerAllRoutes();

    const webSocketController = container.get<WebSocketController>(blockchainModuleSymbols.webSocketController);

    webSocketController.handleConnection.bind(webSocketController);
    webSocketController.handleMessage.bind(webSocketController);

    const peerToPeerWebSocketServer = new PeerToPeerWebSocketServerImpl(
      container,
      webSocketController.handleConnection,
      webSocketController.handleMessage,
    );

    await peerToPeerWebSocketServer.start(peerToPeerPort);

    server.get('/peers', (_req, res) => {
      res.send(peerToPeerWebSocketServer.getPeers());
    });

    server.post('/peers', (req, res) => {
      const requestBody = req.body as { peer: string };

      peerToPeerWebSocketServer.addPeer(requestBody.peer);

      res.send();
    });

    await server.listen({ host: httpServerHost, port: httpServerPort });

    new BlockAddedToBlockchainSubscriber().setupSubscriptions();

    const loggerService = container.get<LoggerService>(loggerModuleSymbols.loggerService);

    loggerService.log({ message: `Server started.`, context: { httpServerHost, httpServerPort } });
  }
}
