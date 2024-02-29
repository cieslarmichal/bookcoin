/* eslint-disable @typescript-eslint/no-explicit-any */
import { WebSocket, WebSocketServer as WsWebSocketServer } from 'ws';

import { type Peer } from './peer.js';
import { type BroadcastToAllPeersPayload, type PeerToPeerWebSocketServer } from './peerToPeerWebSocketServer.js';
import { type ApplicationMessage } from '../../common/types/messages/applicationMessage.js';
import { type DependencyInjectionContainer } from '../../libs/dependencyInjection/dependencyInjectionContainer.js';
import { loggerModuleSymbols } from '../../libs/logger/loggerModuleSymbols.js';
import { type LoggerService } from '../../libs/logger/services/loggerService/loggerService.js';

export class PeerToPeerWebSocketServerImpl implements PeerToPeerWebSocketServer {
  private readonly container: DependencyInjectionContainer;
  private readonly loggerService: LoggerService;
  private wsInstance: WsWebSocketServer | null;
  private peers: WebSocket[] = [];

  public constructor(
    container: DependencyInjectionContainer,
    private readonly connectionHandler: (webSocket: WebSocket) => void,
    private readonly messageHandler: (webSocket: WebSocket, message: ApplicationMessage<any>) => Promise<void>,
  ) {
    this.container = container;

    this.loggerService = this.container.get<LoggerService>(loggerModuleSymbols.loggerService);

    this.wsInstance = null;
  }

  public async start(port: number): Promise<void> {
    const wsInstance = new WsWebSocketServer({ port });

    this.wsInstance = wsInstance;

    wsInstance.on('connection', (ws) => {
      this.initializeConnection(ws);
    });

    wsInstance.on('error', (error) => {
      console.log('connection failed: ', error);
    });

    this.loggerService.info({
      message: `WebSocket server started.`,
      context: {
        port,
        source: PeerToPeerWebSocketServerImpl.name,
      },
    });
  }

  private initializeConnection(ws: WebSocket) {
    this.loggerService.info({
      message: 'Connected to peer.',
      context: {
        source: PeerToPeerWebSocketServerImpl.name,
        remoteAddress: (ws as any)._socket.remoteAddress,
        remotePort: (ws as any)._socket.remotePort,
      },
    });

    this.peers.push(ws);

    ws.on('message', async (data: string) => {
      await this.messageHandler(ws, JSON.parse(data));
    });

    ws.on('close', () => this.closeConnection(ws));

    ws.on('error', (error) => this.closeConnection(ws, error));

    this.connectionHandler(ws);
  }

  private closeConnection(ws: WebSocket, error?: Error): void {
    this.loggerService.error({
      message: 'Connection to peer closed.',
      context: {
        source: PeerToPeerWebSocketServerImpl.name,
        error,
        remoteAddress: (ws as any)._socket.remoteAddress,
        remotePort: (ws as any)._socket.remotePort,
      },
    });

    this.peers.splice(this.peers.indexOf(ws), 1);
  }

  public broadcastToAllPeers(payload: BroadcastToAllPeersPayload): void {
    const { message } = payload;

    const wsInstance = this.wsInstance;

    if (!wsInstance) {
      return;
    }

    wsInstance.clients.forEach((client) => {
      if (client.readyState !== WebSocket.OPEN) {
        return;
      }

      const data = JSON.stringify(message);

      client.send(data);
    });
  }

  public getPeers(): Peer[] {
    return this.peers.map((s: any) => ({ address: s._socket.remoteAddress, port: s._socket.remotePort }));
  }

  public addPeer(connectionString: string): void {
    const ws: WebSocket = new WebSocket(connectionString);

    ws.on('open', () => {
      this.initializeConnection(ws);
    });

    ws.on('error', (error) => {
      console.log('connection failed: ', error);
    });
  }
}
