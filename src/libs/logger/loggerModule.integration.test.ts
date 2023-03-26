import { describe, it, beforeAll, expect } from 'vitest';

import { LoggerModule } from './loggerModule.js';
import { loggerModuleSymbols } from './loggerModuleSymbols.js';
import { LoggerService } from './services/loggerService/loggerService.js';
import { LoggerServiceImpl } from './services/loggerService/loggerServiceImpl.js';
import { LoggerModuleConfigTestFactory } from './tests/factories/loggerModuleConfigTestFactory/loggerModuleConfigTestFactory.js';
import { DependencyInjectionContainer } from '../dependencyInjection/dependencyInjectionContainer.js';
import { DependencyInjectionContainerFactory } from '../dependencyInjection/dependencyInjectionContainerFactory.js';

describe('LoggerModule', () => {
  let container: DependencyInjectionContainer;

  const loggerModuleConfig = new LoggerModuleConfigTestFactory().create();

  beforeAll(async () => {
    container = await DependencyInjectionContainerFactory.create({
      modules: [new LoggerModule(loggerModuleConfig)],
    });
  });

  it('declares bindings', async () => {
    expect(container.get<LoggerService>(loggerModuleSymbols.loggerService)).toBeInstanceOf(LoggerServiceImpl);
  });
});
