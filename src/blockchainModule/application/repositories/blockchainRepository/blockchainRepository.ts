import { SaveBlockchainPayload } from './payloads/saveBlockchainPayload.js';
import { Blockchain } from '../../../domain/entities/blockchain/blockchain.js';

export interface BlockchainRepository {
  findBlockchain(): Promise<Blockchain>;
  saveBlockchain(input: SaveBlockchainPayload): Promise<void>;
}
