import { describe, it, beforeAll, expect } from 'vitest';

import { HttpServiceFactory } from './factories/httpServiceFactory/httpServiceFactory.js';
import { HttpServiceFactoryImpl } from './factories/httpServiceFactory/httpServiceFactoryImpl.js';
import { HttpModule } from './httpModule.js';
import { httpModuleSymbols } from './httpModuleSymbols.js';
import { DependencyInjectionContainer } from '../dependencyInjection/dependencyInjectionContainer.js';
import { DependencyInjectionContainerFactory } from '../dependencyInjection/dependencyInjectionContainerFactory.js';

describe('HttpModule', () => {
  let container: DependencyInjectionContainer;

  beforeAll(async () => {
    container = await DependencyInjectionContainerFactory.create({
      modules: [new HttpModule()],
    });
  });

  it('declares bindings', async () => {
    expect(container.get<HttpServiceFactory>(httpModuleSymbols.httpServiceFactory)).toBeInstanceOf(
      HttpServiceFactoryImpl,
    );
  });
});
