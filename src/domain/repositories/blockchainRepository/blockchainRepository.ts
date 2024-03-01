import { type Block } from '../../entities/block/block.js';
import { Blockchain } from '../../entities/blockchain/blockchain.js';
import { type GenesisBlockService } from '../../services/genesisBlockService/genesisBlockService.js';

export interface SaveBlockchainPayload {
  readonly blockchain: Blockchain;
}

export class BlockchainRepository {
  private blocks: Block[] = [];

  public constructor(private readonly genesisBlockService: GenesisBlockService) {}

  public async findBlockchain(): Promise<Blockchain | null> {
    if (!this.blocks.length) {
      return null;
    }

    return Blockchain.createBlockchain({
      genesisBlockService: this.genesisBlockService,
      blocks: this.blocks,
    });
  }

  public async saveBlockchain(payload: SaveBlockchainPayload): Promise<void> {
    const { blockchain } = payload;

    this.blocks = blockchain.getBlocks();
  }
}
