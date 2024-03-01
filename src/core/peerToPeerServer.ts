/* eslint-disable @typescript-eslint/no-explicit-any */
import { WebSocket, WebSocketServer as WsWebSocketServer } from 'ws';

import { type LoggerService } from '../common/logger/services/loggerService/loggerService.js';
import { type ApplicationMessage } from '../common/types/applicationMessage.js';
import { type WebSocketController } from '../controllers/webSocketController/webSocketController.js';

export interface Peer {
  readonly address: string;
  readonly port: string;
}

export interface BroadcastToAllPeersPayload {
  readonly message: ApplicationMessage<unknown>;
}

export interface PeerToPeerServerConfig {
  readonly port: number;
}

export class PeerToPeerServer {
  private wsInstance: WsWebSocketServer | null = null;
  private peers: WebSocket[] = [];

  public constructor(
    private readonly websocketController: WebSocketController,
    private readonly loggerService: LoggerService,
    private readonly config: PeerToPeerServerConfig,
  ) {}

  public async start(): Promise<void> {
    const wsInstance = new WsWebSocketServer({ port: this.config.port });

    this.wsInstance = wsInstance;

    wsInstance.on('connection', (ws) => {
      this.initializeConnection(ws);
    });

    wsInstance.on('error', (error) => {
      this.loggerService.error({
        message: 'Websocket connection failed.',
        error,
      });
    });

    this.loggerService.info({
      message: 'WebSocket server started.',
      port: this.config.port,
    });
  }

  private initializeConnection(ws: WebSocket): void {
    this.loggerService.debug({
      message: 'Connected to a peer.',
      remoteAddress: (ws as any)._socket.remoteAddress,
      remotePort: (ws as any)._socket.remotePort,
    });

    this.peers.push(ws);

    ws.on('message', async (data: string) => {
      await this.websocketController.handleMessage(ws, JSON.parse(data));
    });

    ws.on('close', () => this.closeConnection(ws));

    ws.on('error', (error) => this.closeConnection(ws, error));

    this.websocketController.handleConnection(ws);
  }

  private closeConnection(ws: WebSocket, error?: Error): void {
    this.loggerService.error({
      message: 'Connection to peer closed.',
      error,
      remoteAddress: (ws as any)._socket.remoteAddress,
      remotePort: (ws as any)._socket.remotePort,
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
    return this.peers.map((s: any) => ({
      address: s._socket.remoteAddress,
      port: s._socket.remotePort,
    }));
  }

  public addPeer(connectionString: string): void {
    const ws: WebSocket = new WebSocket(connectionString);

    ws.on('open', () => {
      this.initializeConnection(ws);
    });

    ws.on('error', (error) => {
      this.loggerService.error({
        message: 'Websocket connection failed.',
        error,
      });
    });
  }
}
