import { fastify } from 'fastify';

export class Application {
  public static async start(): Promise<void> {
    const server = fastify();

    const logLevel = process.env[EnvKey.logLevel] as LogLevel;

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
