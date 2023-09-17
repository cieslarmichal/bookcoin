import { LoggerModuleConfig } from '../../../loggerModuleConfig.js';
import { LogLevel } from '../../../logLevel.js';

export class LoggerModuleConfigTestFactory {
  public create(payload: Partial<LoggerModuleConfig> = {}): LoggerModuleConfig {
    return {
      logLevel: LogLevel.debug,
      ...payload,
    };
  }
}
