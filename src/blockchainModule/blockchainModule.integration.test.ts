import 'reflect-metadata';

import { describe, it, beforeAll, expect } from 'vitest';

import { BlockchainModule } from './blockchainModule.js';
import { blockchainModuleSymbols } from './blockchainModuleSymbols.js';
import { BlockchainHttpController } from './infrastructure/httpControllers/blockchainHttpController/blockchainHttpController.js';
import { DependencyInjectionContainer } from '../libs/dependencyInjection/dependencyInjectionContainer.js';
import { DependencyInjectionContainerFactory } from '../libs/dependencyInjection/dependencyInjectionContainerFactory.js';
import { LoggerModule } from '../libs/logger/loggerModule.js';
import { LoggerModuleConfigTestFactory } from '../libs/logger/tests/factories/loggerModuleConfigTestFactory/loggerModuleConfigTestFactory.js';

describe('BlockchainModule', () => {
  let container: DependencyInjectionContainer;

  const loggerModuleConfig = new LoggerModuleConfigTestFactory().create();

  beforeAll(async () => {
    container = DependencyInjectionContainerFactory.create({
      modules: [new LoggerModule(loggerModuleConfig), new BlockchainModule()],
    });
  });

  it('declares bindings', async () => {
    expect(container.get<BlockchainHttpController>(blockchainModuleSymbols.blockchainHttpController)).toBeInstanceOf(
      BlockchainHttpController,
    );
  });
});
