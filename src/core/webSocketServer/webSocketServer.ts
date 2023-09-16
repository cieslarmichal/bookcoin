import { type Server } from 'http';

export interface BroadcastToAllClientsPayload {
  event: ApplicationEvent<unknown>;
}

export interface WebSocketServer {
  start(server: Server): Promise<void>;
  broadcastToAllClients(payload: BroadcastToAllClientsPayload): void;
}
