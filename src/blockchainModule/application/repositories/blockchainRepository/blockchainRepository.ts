import { Blockchain } from '../../../domain/entities/blockchain/blockchain.js';

export interface SaveBlockchainPayload {
  readonly blockchain: Blockchain;
}

export interface BlockchainRepository {
  findBlockchain(): Promise<Blockchain | null>;
  saveBlockchain(payload: SaveBlockchainPayload): Promise<void>;
}
