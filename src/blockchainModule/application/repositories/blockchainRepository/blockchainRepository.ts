import { Blockchain } from '../../../domain/entities/blockchain/blockchain.js';

export interface SaveBlockchainPayload {
  blockchain: Blockchain;
}

export interface BlockchainRepository {
  findBlockchain(): Promise<Blockchain | null>;
  saveBlockchain(input: SaveBlockchainPayload): Promise<void>;
}
