import { FindBlocksFromBlockchainQueryHandler } from './findBlocksFromBlockchainQueryHandler.js';
import {
  FindBlocksFromBlockchainQueryHandlerResult,
  findBlocksFromBlockchainQueryHandlerResultSchema,
} from './payloads/findBlocksFromBlockchainQueryHandlerResult.js';
import { Inject } from '../../../../libs/dependencyInjection/decorators.js';
import { loggerModuleSymbols } from '../../../../libs/logger/loggerModuleSymbols.js';
import { LoggerService } from '../../../../libs/logger/services/loggerService/loggerService.js';
import { Validator } from '../../../../libs/validator/validator.js';
import { blockchainModuleSymbols } from '../../../blockchainModuleSymbols.js';
import { BlockchainRepository } from '../../repositories/blockchainRepository/blockchainRepository.js';

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

    const blocks = blockchain.getBlocks();

    this.loggerService.info({ message: 'Blocks from blockchain fetched.', context: { numberOfBlocks: blocks.length } });

    return Validator.validate(findBlocksFromBlockchainQueryHandlerResultSchema, { blocks });
  }
}
