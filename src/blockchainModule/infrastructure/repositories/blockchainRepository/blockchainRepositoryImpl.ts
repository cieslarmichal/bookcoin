import { Inject, Injectable } from '../../../../libs/dependencyInjection/decorators.js';
import {
  BlockchainRepository,
  SaveBlockchainPayload,
} from '../../../application/repositories/blockchainRepository/blockchainRepository.js';
import { blockchainModuleSymbols } from '../../../blockchainModuleSymbols.js';
import { Block } from '../../../domain/valueObjects/block/block.js';
import { Blockchain } from '../../../domain/entities/blockchain/blockchain.js';
import { GenesisBlockService } from '../../../domain/services/genesisBlockService/genesisBlockService.js';
import { DomainEvents } from '../../../../common/types/domain/events/domainEvents.js';

@Injectable()
export class BlockchainRepositoryImpl implements BlockchainRepository {
  private blocks: Block[] = [];

  public constructor(
    @Inject(blockchainModuleSymbols.genesisBlockService)
    private readonly genesisBlockService: GenesisBlockService,
  ) {}

  public async findBlockchain(): Promise<Blockchain | null> {
    if (!this.blocks.length) {
      return null;
    }

    return Blockchain.createBlockchain({ genesisBlockService: this.genesisBlockService, blocks: this.blocks });
  }

  public async saveBlockchain(payload: SaveBlockchainPayload): Promise<void> {
    const { blockchain } = payload;

    await DomainEvents.dispatchEventsForAggregate(blockchain.id);

    this.blocks = blockchain.getBlocks();
  }
}
