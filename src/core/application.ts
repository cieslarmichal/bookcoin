import { fastify } from 'fastify';

import { config } from './config.js';
import { PeerToPeerServer } from './peerToPeerServer.js';
import { AddBlockToBlockchainAction } from '../actions/addBlockToBlockchainAction/addBlockToBlockchainAction.js';
import { CreateBlockchainAction } from '../actions/createBlockchainAction/createBlockchainAction.js';
import { FindBlocksFromBlockchainAction } from '../actions/findBlocksFromBlockchainAction/findBlocksFromBlockchainAction.js';
import { LoggerServiceFactory } from '../common/logger/factories/loggerServiceFactory/loggerServiceFactory.js';
import { HttpController } from '../controllers/httpController/httpController.js';
import { WebSocketController } from '../controllers/webSocketController/webSocketController.js';
import { BlockchainRepository } from '../domain/repositories/blockchainRepository/blockchainRepository.js';
import { GenesisBlockService } from '../domain/services/genesisBlockService/genesisBlockService.js';

export class Application {
  public static async start(): Promise<void> {
    const server = fastify();

    const { httpPort, p2pPort, genesisBlock, logLevel } = config;

    const genesisBlockService = new GenesisBlockService({ genesisBlock });

    const blockRepository = new BlockchainRepository(genesisBlockService);

    const loggerService = LoggerServiceFactory.create({ logLevel });

    const createBlockchainAction = new CreateBlockchainAction(blockRepository, genesisBlockService, loggerService);

    const addBlockToBlockchainAction = new AddBlockToBlockchainAction(
      blockRepository,
      genesisBlockService,
      loggerService,
    );

    const findBlocksFromBlockchainAction = new FindBlocksFromBlockchainAction(blockRepository, loggerService);

    const websocketController = new WebSocketController(findBlocksFromBlockchainAction);

    const peerToPeerServer = new PeerToPeerServer(websocketController, loggerService, { port: p2pPort });

    const httpController = new HttpController(
      createBlockchainAction,
      addBlockToBlockchainAction,
      findBlocksFromBlockchainAction,
      peerToPeerServer,
    );

    httpController.registerRoutes(server);

    await peerToPeerServer.start();

    await server.listen({ port: httpPort });

    loggerService.info({
      message: 'Http server started.',
      port: httpPort,
    });
  }
}
