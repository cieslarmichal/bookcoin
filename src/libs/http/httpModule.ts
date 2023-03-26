import { FetchClient } from './clients/fetchClient/fetchClient.js';
import { FetchClientImpl } from './clients/fetchClient/fetchClientImpl.js';
import { HttpServiceFactory } from './factories/httpServiceFactory/httpServiceFactory.js';
import { HttpServiceFactoryImpl } from './factories/httpServiceFactory/httpServiceFactoryImpl.js';
import { httpModuleSymbols } from './httpModuleSymbols.js';
import { DependencyInjectionContainer } from '../dependencyInjection/dependencyInjectionContainer.js';
import { DependencyInjectionModule } from '../dependencyInjection/dependencyInjectionModule.js';

export class HttpModule implements DependencyInjectionModule {
  public async declareBindings(container: DependencyInjectionContainer): Promise<void> {
    container.bindToConstructor<FetchClient>(httpModuleSymbols.fetchClient, FetchClientImpl);

    container.bindToConstructor<HttpServiceFactory>(httpModuleSymbols.httpServiceFactory, HttpServiceFactoryImpl);
  }
}
