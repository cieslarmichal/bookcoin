import { Inject, Injectable } from '../../../../libs/dependencyInjection/decorators.js';
import { Validator } from '../../../../libs/validator/validator.js';
import { BlockchainRepository } from '../../../application/repositories/blockchainRepository/blockchainRepository.js';
import {
  SaveBlockchainPayload,
  saveBlockchainPayloadSchema,
} from '../../../application/repositories/blockchainRepository/payloads/saveBlockchainPayload.js';
import { blockchainModuleSymbols } from '../../../blockchainModuleSymbols.js';
import { Block } from '../../../domain/entities/block/block.js';
import { Blockchain } from '../../../domain/entities/blockchain/blockchain.js';
import { GenesisBlockService } from '../../../domain/services/genesisBlockService/genesisBlockService.js';

@Injectable()
export class BlockchainRepositoryImpl implements BlockchainRepository {
  private blocks: Block[] = [];

  public constructor(
    @Inject(blockchainModuleSymbols.genesisBlockService)
    private readonly genesisBlockService: GenesisBlockService,
  ) {}

  public async findBlockchain(): Promise<Blockchain> {
    return Blockchain.createBlockchain({ genesisBlockService: this.genesisBlockService, blocks: this.blocks });
  }

  public async saveBlockchain(input: SaveBlockchainPayload): Promise<void> {
    const { blockchain } = Validator.validate(saveBlockchainPayloadSchema, input);

    this.blocks = blockchain.getBlocks();
  }
}
