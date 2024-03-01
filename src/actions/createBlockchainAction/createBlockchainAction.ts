import { ResourceAlreadyExistsError } from '../../common/errors/resourceAlreadyExistsError.js';
import { type LoggerService } from '../../common/logger/services/loggerService/loggerService.js';
import { type Block } from '../../domain/entities/block/block.js';
import { Blockchain } from '../../domain/entities/blockchain/blockchain.js';
import { type BlockchainRepository } from '../../domain/repositories/blockchainRepository/blockchainRepository.js';
import { type GenesisBlockService } from '../../domain/services/genesisBlockService/genesisBlockService.js';

export interface CreateBlockchainActionResult {
  readonly blocks: Block[];
}

export class CreateBlockchainAction {
  public constructor(
    private readonly blockchainRepository: BlockchainRepository,
    private readonly genesisBlockService: GenesisBlockService,
    private readonly loggerService: LoggerService,
  ) {}

  public async execute(): Promise<CreateBlockchainActionResult> {
    const existingBlockchain = await this.blockchainRepository.findBlockchain();

    if (existingBlockchain) {
      throw new ResourceAlreadyExistsError({
        name: 'Blockchain',
      });
    }

    this.loggerService.debug({ message: 'Creating the blockchain...' });

    const genesisBlock = this.genesisBlockService.createGenesisBlock();

    const blockchain = Blockchain.createBlockchain({
      genesisBlockService: this.genesisBlockService,
      blocks: [genesisBlock],
    });

    await this.blockchainRepository.saveBlockchain({ blockchain });

    this.loggerService.debug({ message: 'Blockchain created.' });

    const blocks = blockchain.getBlocks();

    return { blocks };
  }
}
