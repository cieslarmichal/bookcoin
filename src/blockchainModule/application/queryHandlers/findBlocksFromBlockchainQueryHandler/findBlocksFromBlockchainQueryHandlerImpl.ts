import {
  FindBlocksFromBlockchainQueryHandler,
  FindBlocksFromBlockchainQueryHandlerResult,
} from './findBlocksFromBlockchainQueryHandler.js';
import { Inject, Injectable } from '../../../../libs/dependencyInjection/decorators.js';
import { loggerModuleSymbols } from '../../../../libs/logger/loggerModuleSymbols.js';
import { LoggerService } from '../../../../libs/logger/services/loggerService/loggerService.js';
import { blockchainModuleSymbols } from '../../../blockchainModuleSymbols.js';
import { BlockchainRepository } from '../../repositories/blockchainRepository/blockchainRepository.js';
import { BlockchainNotFoundError } from '../../errors/blockchainNotFoundError.js';

@Injectable()
export class FindBlocksFromBlockchainQueryHandlerImpl implements FindBlocksFromBlockchainQueryHandler {
  public constructor(
    @Inject(blockchainModuleSymbols.blockchainRepository)
    private readonly blockRepository: BlockchainRepository,
    @Inject(loggerModuleSymbols.loggerService)
    private readonly loggerService: LoggerService,
  ) {}

  public async execute(): Promise<FindBlocksFromBlockchainQueryHandlerResult> {
    this.loggerService.debug({ message: 'Fetching blocks from blockchain...' });

    const blockchain = await this.blockRepository.findBlockchain();

    if (!blockchain) {
      throw new BlockchainNotFoundError();
    }

    const blocks = blockchain.getBlocks();

    this.loggerService.info({ message: 'Blocks from blockchain fetched.', context: { numberOfBlocks: blocks.length } });

    return { blocks };
  }
}
