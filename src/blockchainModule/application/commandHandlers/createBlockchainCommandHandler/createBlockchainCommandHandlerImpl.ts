import { Inject, Injectable } from '../../../../libs/dependencyInjection/decorators.js';
import { loggerModuleSymbols } from '../../../../libs/logger/loggerModuleSymbols.js';
import { LoggerService } from '../../../../libs/logger/services/loggerService/loggerService.js';
import { Validator } from '../../../../libs/validator/validator.js';
import { blockchainModuleSymbols } from '../../../blockchainModuleSymbols.js';
import { Blockchain } from '../../../domain/entities/blockchain/blockchain.js';
import { GenesisBlockService } from '../../../domain/services/genesisBlockService/genesisBlockService.js';
import { BlockchainAlreadyExistsError } from '../../errors/blockchainAlreadyExistsError.js';
import { BlockchainRepository } from '../../repositories/blockchainRepository/blockchainRepository.js';
import { CreateBlockchainCommandHandler } from './createBlockchainCommandHandler.js';
import {
  CreateBlockchainCommandHandlerResult,
  createBlockchainCommandHandlerResultSchema,
} from './payloads/createBlockchainCommandHandlerResult.js';

@Injectable()
export class CreateBlockchainCommandHandlerImpl implements CreateBlockchainCommandHandler {
  public constructor(
    @Inject(blockchainModuleSymbols.blockchainRepository)
    private readonly blockRepository: BlockchainRepository,
    @Inject(blockchainModuleSymbols.genesisBlockService)
    private readonly genesisBlockService: GenesisBlockService,
    @Inject(loggerModuleSymbols.loggerService)
    private readonly loggerService: LoggerService,
  ) {}

  public async execute(): Promise<CreateBlockchainCommandHandlerResult> {
    const existingBlockchain = await this.blockRepository.findBlockchain();

    if (existingBlockchain) {
      throw new BlockchainAlreadyExistsError();
    }

    this.loggerService.debug({ message: 'Creating the blockchain...' });

    const genesisBlock = this.genesisBlockService.createGenesisBlock();

    const blockchain = Blockchain.createBlockchain({
      genesisBlockService: this.genesisBlockService,
      blocks: [genesisBlock],
    });

    await this.blockRepository.saveBlockchain({ blockchain });

    this.loggerService.info({ message: 'Blockchain created.' });

    const blocks = blockchain.getBlocks();

    return Validator.validate(createBlockchainCommandHandlerResultSchema, { blocks });
  }
}
