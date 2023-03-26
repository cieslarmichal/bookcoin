import { createLogger, LogLevel } from 'bunyan';

import { LoggerClientFactory } from './loggerClientFactory.js';
import { Injectable, Inject } from '../../../dependencyInjection/decorators.js';
import { LoggerClient } from '../../clients/loggerClient/loggerClient.js';
import { LoggerModuleConfig } from '../../loggerModuleConfig.js';
import { loggerModuleSymbols } from '../../loggerModuleSymbols.js';

@Injectable()
export class LoggerClientFactoryImpl implements LoggerClientFactory {
  public constructor(
    @Inject(loggerModuleSymbols.loggerModuleConfig)
    private readonly loggerModuleConfig: LoggerModuleConfig,
  ) {}

  public create(): LoggerClient {
    const logLevel = this.loggerModuleConfig.logLevel as LogLevel;

    const loggerClient = createLogger({ name: 'logger', level: logLevel });

    return loggerClient;
  }
}
