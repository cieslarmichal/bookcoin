import { BlockRepository } from './application/repositories/blockRepository/blockRepository.js';
import { blockchainModuleSymbols } from './blockchainModuleSymbols.js';
import { GenesisBlockService } from './domain/services/genesisBlockService/genesisBlockService.js';
import { BlockchainHttpController } from './infrastructure/httpControllers/blockchainHttpController/blockchainHttpController.js';
import { BlockRepositoryImpl } from './infrastructure/repositories/blockRepositoryImpl.js';
import { DependencyInjectionContainer } from '../libs/dependencyInjection/dependencyInjectionContainer.js';
import { DependencyInjectionModule } from '../libs/dependencyInjection/dependencyInjectionModule.js';

export class BlockchainModule implements DependencyInjectionModule {
  public async declareBindings(container: DependencyInjectionContainer): Promise<void> {
    container.bindToConstructor<GenesisBlockService>(blockchainModuleSymbols.genesisBlockService, GenesisBlockService);

    container.bindToConstructor<BlockRepository>(blockchainModuleSymbols.blockRepository, BlockRepositoryImpl);

    container.bindToConstructor<BlockchainHttpController>(
      blockchainModuleSymbols.blockchainHttpController,
      BlockchainHttpController,
    );
  }
}
