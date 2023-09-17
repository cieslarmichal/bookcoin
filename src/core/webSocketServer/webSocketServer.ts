import { type Server } from 'http';
import { ApplicationEvent } from '../../common/types/domain/events/applicationEvent.js';

export interface BroadcastToAllClientsPayload {
  event: ApplicationEvent<unknown>;
}

export interface WebSocketServer {
  start(server: Server): Promise<void>;
  broadcastToAllClients(payload: BroadcastToAllClientsPayload): void;
}
