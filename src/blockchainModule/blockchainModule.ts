import { AddBlockToBlockchainCommandHandler } from './application/commandHandlers/addBlockToBlockchainCommandHandler/addBlockToBlockchainCommandHandler.js';
import { AddBlockToBlockchainCommandHandlerImpl } from './application/commandHandlers/addBlockToBlockchainCommandHandler/addBlockToBlockchainCommandHandlerImpl.js';
import { FindBlocksFromBlockchainQueryHandler } from './application/queryHandlers/findBlocksFromBlockchainQueryHandler/findBlocksFromBlockchainQueryHandler.js';
import { FindBlocksFromBlockchainQueryHandlerImpl } from './application/queryHandlers/findBlocksFromBlockchainQueryHandler/findBlocksFromBlockchainQueryHandlerImpl.js';
import { BlockchainRepository } from './application/repositories/blockchainRepository/blockchainRepository.js';
import { BlockAddedToBlockchainSubscriber } from './application/subscribers/blockAddedToBlockchainSubscriber/blockAddedToBlockchainSubscriber.js';
import { blockchainModuleSymbols } from './blockchainModuleSymbols.js';
import { GenesisBlockService } from './domain/services/genesisBlockService/genesisBlockService.js';
import { BlockchainHttpController } from './api/httpControllers/blockchainHttpController/blockchainHttpController.js';
import { BlockchainRepositoryImpl } from './infrastructure/repositories/blockchainRepository/blockchainRepositoryImpl.js';
import { DependencyInjectionContainer } from '../libs/dependencyInjection/dependencyInjectionContainer.js';
import { DependencyInjectionModule } from '../libs/dependencyInjection/dependencyInjectionModule.js';
import { CreateBlockchainCommandHandler } from './application/commandHandlers/createBlockchainCommandHandler/createBlockchainCommandHandler.js';
import { CreateBlockchainCommandHandlerImpl } from './application/commandHandlers/createBlockchainCommandHandler/createBlockchainCommandHandlerImpl.js';

export class BlockchainModule implements DependencyInjectionModule {
  public async declareBindings(container: DependencyInjectionContainer): Promise<void> {
    container.bindToConstructor<GenesisBlockService>(blockchainModuleSymbols.genesisBlockService, GenesisBlockService);

    container.bindToConstructor<BlockchainRepository>(
      blockchainModuleSymbols.blockchainRepository,
      BlockchainRepositoryImpl,
    );

    container.bindToConstructor<CreateBlockchainCommandHandler>(
      blockchainModuleSymbols.createBlockchainCommandHandler,
      CreateBlockchainCommandHandlerImpl,
    );

    container.bindToConstructor<AddBlockToBlockchainCommandHandler>(
      blockchainModuleSymbols.addBlockToBlockchainCommandHandler,
      AddBlockToBlockchainCommandHandlerImpl,
    );

    container.bindToConstructor<FindBlocksFromBlockchainQueryHandler>(
      blockchainModuleSymbols.findBlocksFromBlockchainQueryHandler,
      FindBlocksFromBlockchainQueryHandlerImpl,
    );

    container.bindToConstructor<BlockAddedToBlockchainSubscriber>(
      blockchainModuleSymbols.blockAddedToBlockchainSubscriber,
      BlockAddedToBlockchainSubscriber,
    );

    container.bindToConstructor<BlockchainHttpController>(
      blockchainModuleSymbols.blockchainHttpController,
      BlockchainHttpController,
    );
  }
}
