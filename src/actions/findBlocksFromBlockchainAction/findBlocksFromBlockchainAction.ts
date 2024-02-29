import { ResourceNotFoundError } from '../../common/errors/resourceNotFoundError.js';
import { type LoggerService } from '../../common/logger/services/loggerService/loggerService.js';
import { type Block } from '../../domain/entities/block/block.js';
import { type BlockchainRepository } from '../../domain/repositories/blockchainRepository/blockchainRepository.js';

export interface FindBlocksFromBlockchainActionResult {
  readonly blocks: Block[];
}

export class FindBlocksFromBlockchainAction {
  public constructor(
    private readonly blockRepository: BlockchainRepository,
    private readonly loggerService: LoggerService,
  ) {}

  public async execute(): Promise<FindBlocksFromBlockchainActionResult> {
    this.loggerService.debug({ message: 'Fetching blocks from blockchain...' });

    const blockchain = await this.blockRepository.findBlockchain();

    if (!blockchain) {
      throw new ResourceNotFoundError({
        name: 'Blockchain',
      });
    }

    const blocks = blockchain.getBlocks();

    this.loggerService.debug({
      message: 'Blocks from blockchain fetched.',
      numberOfBlocks: blocks.length,
    });

    return { blocks };
  }
}
