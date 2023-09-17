import { ApplicationMessage } from '../../common/types/messages/applicationMessage.js';
import { Peer } from './peer.js';

export interface BroadcastToAllPeersPayload {
  message: ApplicationMessage<unknown>;
}

export interface PeerToPeerWebSocketServer {
  start(port: number): Promise<void>;
  broadcastToAllPeers(payload: BroadcastToAllPeersPayload): void;
  getPeers(): Peer[];
  addPeer(connectionString: string): void;
}
