import { AddBlockToBlockchainCommandHandler } from './addBlockToBlockchainCommandHandler.js';
import {
  AddBlockToBlockchainCommandHandlerPayload,
  addBlockToBlockchainCommandHandlerPayloadSchema,
} from './payloads/addBlockToBlockchainCommandHandlerPayload.js';
import { Inject } from '../../../../libs/dependencyInjection/decorators.js';
import { loggerModuleSymbols } from '../../../../libs/logger/loggerModuleSymbols.js';
import { LoggerService } from '../../../../libs/logger/services/loggerService/loggerService.js';
import { Validator } from '../../../../libs/validator/validator.js';
import { blockchainModuleSymbols } from '../../../blockchainModuleSymbols.js';
import { BlockService } from '../../../domain/services/blockService/blockService.js';
import { BlockRepository } from '../../repositories/blockRepository/blockRepository.js';

export class AddBlockToBlockchainCommandHandlerImpl implements AddBlockToBlockchainCommandHandler {
  public constructor(
    @Inject(blockchainModuleSymbols.blockRepository)
    private readonly blockRepository: BlockRepository,
    @Inject(blockchainModuleSymbols.genesisBlockService)
    private readonly blockService: BlockService,
    @Inject(loggerModuleSymbols.loggerService)
    private readonly loggerService: LoggerService,
  ) {}

  public async execute(input: AddBlockToBlockchainCommandHandlerPayload): Promise<void> {
    const { blockData } = Validator.validate(addBlockToBlockchainCommandHandlerPayloadSchema, input);

    const currentBlocks = await this.blockRepository.findBlocks();

    if (!currentBlocks.length) {
      this.loggerService.debug({ message: 'Adding genesis block to the blockchain...' });

      const genesisBlock = this.blockService.createGenesisBlock();

      await this.blockRepository.saveBlock({ block: genesisBlock });

      this.loggerService.debug({ message: 'Genesis block added to the blockchain.' });
    }

    this.loggerService.debug({
      message: 'Adding block to the blockchain...',
      context: { blockData, blockchainLenght: currentBlocks.length },
    });

    const block = this.blockService.createBlock();
  }
}
