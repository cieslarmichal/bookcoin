import { describe, it, beforeAll, expect } from 'vitest';

import { BlockchainModule } from './blockchainModule.js';
import { blockchainModuleSymbols } from './blockchainModuleSymbols.js';
import { BlockchainService } from './domain/services/blockchainService/blockchainService.js';
import { BlockService } from './domain/services/blockService/blockService.js';
import { DependencyInjectionContainer } from '../libs/dependencyInjection/dependencyInjectionContainer.js';
import { DependencyInjectionContainerFactory } from '../libs/dependencyInjection/dependencyInjectionContainerFactory.js';
import { LoggerModule } from '../libs/logger/loggerModule.js';
import { LoggerModuleConfigTestFactory } from '../libs/logger/tests/factories/loggerModuleConfigTestFactory/loggerModuleConfigTestFactory.js';

describe('BlockchainModule', () => {
  let container: DependencyInjectionContainer;

  const loggerModuleConfig = new LoggerModuleConfigTestFactory().create();

  beforeAll(async () => {
    container = await DependencyInjectionContainerFactory.create({
      modules: [new LoggerModule(loggerModuleConfig), new BlockchainModule()],
    });
  });

  it('declares bindings', async () => {
    expect(container.get<BlockService>(blockchainModuleSymbols.blockService)).toBeInstanceOf(BlockService);

    expect(container.get<BlockchainService>(blockchainModuleSymbols.blockchainService)).toBeInstanceOf(
      BlockchainService,
    );
  });
});
