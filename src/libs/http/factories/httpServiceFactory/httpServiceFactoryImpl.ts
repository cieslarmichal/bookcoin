import { HttpServiceFactory } from './httpServiceFactory.js';
import { Injectable, Inject } from '../../../dependencyInjection/decorators.js';
import { loggerModuleSymbols } from '../../../logger/loggerModuleSymbols.js';
import { LoggerService } from '../../../logger/services/loggerService/loggerService.js';
import { Validator } from '../../../validator/validator.js';
import { FetchClient } from '../../clients/fetchClient/fetchClient.js';
import { httpModuleSymbols } from '../../httpModuleSymbols.js';
import { HttpService } from '../../services/httpService/httpService.js';
import { HttpServiceConfig, httpServiceConfigSchema } from '../../services/httpService/httpServiceConfig.js';
import { HttpServiceImpl } from '../../services/httpService/httpServiceImpl.js';

@Injectable()
export class HttpServiceFactoryImpl implements HttpServiceFactory {
  public constructor(
    @Inject(httpModuleSymbols.fetchClient)
    private readonly fetchClient: FetchClient,
    @Inject(loggerModuleSymbols.loggerService)
    private readonly loggerService: LoggerService,
  ) {}

  public create(input: HttpServiceConfig): HttpService {
    const config = Validator.validate(httpServiceConfigSchema, input);

    return new HttpServiceImpl(config, this.fetchClient, this.loggerService);
  }
}
