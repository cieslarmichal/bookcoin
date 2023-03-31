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
import { Block } from '../../../domain/entities/block/block.js';
import { GenesisBlockService } from '../../../domain/services/genesisBlockService/genesisBlockService.js';
import { BlockchainRepository } from '../../repositories/blockchainRepository/blockchainRepository.js';

export class AddBlockToBlockchainCommandHandlerImpl implements AddBlockToBlockchainCommandHandler {
  public constructor(
    @Inject(blockchainModuleSymbols.blockchainRepository)
    private readonly blockRepository: BlockchainRepository,
    @Inject(blockchainModuleSymbols.genesisBlockService)
    private readonly genesisBlockService: GenesisBlockService,
    @Inject(loggerModuleSymbols.loggerService)
    private readonly loggerService: LoggerService,
  ) {}

  public async execute(input: AddBlockToBlockchainCommandHandlerPayload): Promise<void> {
    const { blockData } = Validator.validate(addBlockToBlockchainCommandHandlerPayloadSchema, input);

    const blockchain = await this.blockRepository.findBlockchain();

    this.loggerService.debug({ message: 'Adding block to the blockchain...', context: { blockData } });

    const previousBlock = blockchain.getLastBlock();

    const block = Block.createBlock({
      genesisBlockService: this.genesisBlockService,
      index: previousBlock.index + 1,
      previousHash: previousBlock.hash,
      data: blockData,
    });

    blockchain.addBlock(block);

    await this.blockRepository.saveBlockchain({ blockchain });

    this.loggerService.info({ message: 'Block added to the blockchain.', context: { blockIndex: block.index } });
  }
}
