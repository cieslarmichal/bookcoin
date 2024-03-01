import { fastify } from 'fastify';

export class Application {
  public static async start(): Promise<void> {
    const server = fastify();

    const httpRouter = new HttpRouter(server, container);

    httpRouter.registerAllRoutes();

    const webSocketController = container.get<WebSocketController>(blockchainModuleSymbols.webSocketController);

    webSocketController.handleConnection.bind(webSocketController);

    webSocketController.handleMessage.bind(webSocketController);

    const peerToPeerServer = new PeerToPeerServerImpl(
      container,
      webSocketController.handleConnection,
      webSocketController.handleMessage,
    );

    await peerToPeerServer.start(peerToPeerPort);

    server.get('/peers', (_req, res) => {
      res.send(peerToPeerServer.getPeers());
    });

    server.post('/peers', (req, res) => {
      const requestBody = req.body as { peer: string };

      peerToPeerServer.addPeer(requestBody.peer);

      res.send();
    });

    await server.listen({ host: httpServerHost, port: httpServerPort });

    loggerService.log({ message: `Server started.`, context: { httpServerHost, httpServerPort } });
  }
}
