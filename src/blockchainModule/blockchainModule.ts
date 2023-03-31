import { AddBlockToBlockchainCommandHandler } from './application/commandHandlers/addBlockToBlockchainCommandHandler/addBlockToBlockchainCommandHandler.js';
import { AddBlockToBlockchainCommandHandlerImpl } from './application/commandHandlers/addBlockToBlockchainCommandHandler/addBlockToBlockchainCommandHandlerImpl.js';
import { FindBlocksFromBlockchainQueryHandler } from './application/queryHandlers/findBlocksFromBlockchainQueryHandler/findBlocksFromBlockchainQueryHandler.js';
import { FindBlocksFromBlockchainQueryHandlerImpl } from './application/queryHandlers/findBlocksFromBlockchainQueryHandler/findBlocksFromBlockchainQueryHandlerImpl.js';
import { BlockchainRepository } from './application/repositories/blockchainRepository/blockchainRepository.js';
import { blockchainModuleSymbols } from './blockchainModuleSymbols.js';
import { GenesisBlockService } from './domain/services/genesisBlockService/genesisBlockService.js';
import { BlockchainHttpController } from './infrastructure/httpControllers/blockchainHttpController/blockchainHttpController.js';
import { BlockchainRepositoryImpl } from './infrastructure/repositories/blockchainRepository/blockchainRepositoryImpl.js';
import { DependencyInjectionContainer } from '../libs/dependencyInjection/dependencyInjectionContainer.js';
import { DependencyInjectionModule } from '../libs/dependencyInjection/dependencyInjectionModule.js';

export class BlockchainModule implements DependencyInjectionModule {
  public async declareBindings(container: DependencyInjectionContainer): Promise<void> {
    container.bindToConstructor<GenesisBlockService>(blockchainModuleSymbols.genesisBlockService, GenesisBlockService);

    container.bindToConstructor<BlockchainRepository>(
      blockchainModuleSymbols.blockchainRepository,
      BlockchainRepositoryImpl,
    );

    container.bindToConstructor<AddBlockToBlockchainCommandHandler>(
      blockchainModuleSymbols.addBlockToBlockchainCommandHandler,
      AddBlockToBlockchainCommandHandlerImpl,
    );

    container.bindToConstructor<FindBlocksFromBlockchainQueryHandler>(
      blockchainModuleSymbols.findBlocksFromBlockchainQueryHandler,
      FindBlocksFromBlockchainQueryHandlerImpl,
    );

    container.bindToConstructor<BlockchainHttpController>(
      blockchainModuleSymbols.blockchainHttpController,
      BlockchainHttpController,
    );
  }
}
