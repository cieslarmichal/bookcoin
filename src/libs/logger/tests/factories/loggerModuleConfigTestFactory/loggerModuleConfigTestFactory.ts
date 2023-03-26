import { LoggerModuleConfig } from '../../../loggerModuleConfig.js';
import { LogLevel } from '../../../logLevel.js';

export class LoggerModuleConfigTestFactory {
  public create(input: Partial<LoggerModuleConfig> = {}): LoggerModuleConfig {
    return {
      logLevel: LogLevel.debug,
      ...input,
    };
  }
}
