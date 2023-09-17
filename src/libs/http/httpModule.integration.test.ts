import 'reflect-metadata';

import { describe, it, beforeAll, expect } from 'vitest';

import { HttpModule } from './httpModule.js';
import { httpModuleSymbols } from './httpModuleSymbols.js';
import { DependencyInjectionContainer } from '../dependencyInjection/dependencyInjectionContainer.js';
import { DependencyInjectionContainerFactory } from '../dependencyInjection/dependencyInjectionContainerFactory.js';
import { HttpServiceImpl } from './services/httpService/httpServiceImpl.js';
import { HttpService } from './services/httpService/httpService.js';

describe('HttpModule', () => {
  let container: DependencyInjectionContainer;

  beforeAll(async () => {
    container = DependencyInjectionContainerFactory.create({
      modules: [new HttpModule()],
    });
  });

  it('declares bindings', async () => {
    expect(container.get<HttpService>(httpModuleSymbols.httpService)).toBeInstanceOf(HttpServiceImpl);
  });
});
