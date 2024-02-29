import { pino } from 'pino';

import { LoggerService } from '../../services/loggerService/loggerService.js';

export interface LoggerConfig {
  readonly logLevel: string;
}

export class LoggerServiceFactory {
  public static create(config: LoggerConfig): LoggerService {
    const loggerClient = pino({
      name: 'Logger',
      level: config.logLevel,
    });

    return new LoggerService(loggerClient);
  }
}
