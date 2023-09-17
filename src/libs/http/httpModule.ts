import { FetchClient } from './clients/fetchClient/fetchClient.js';
import { FetchClientImpl } from './clients/fetchClient/fetchClientImpl.js';
import { httpModuleSymbols } from './httpModuleSymbols.js';
import { DependencyInjectionContainer } from '../dependencyInjection/dependencyInjectionContainer.js';
import { DependencyInjectionModule } from '../dependencyInjection/dependencyInjectionModule.js';
import { HttpServiceImpl } from './services/httpService/httpServiceImpl.js';
import { HttpService } from './services/httpService/httpService.js';

export class HttpModule implements DependencyInjectionModule {
  public async declareBindings(container: DependencyInjectionContainer): Promise<void> {
    container.bindToConstructor<FetchClient>(httpModuleSymbols.fetchClient, FetchClientImpl);

    container.bindToConstructor<HttpService>(httpModuleSymbols.httpService, HttpServiceImpl);
  }
}
