import { LoggerService } from './loggerService.js';
import { DebugPayload, debugPayloadSchema } from './payloads/debugPayload.js';
import { ErrorPayload, errorPayloadSchema } from './payloads/errorPayload.js';
import { FatalPayload, fatalPayloadSchema } from './payloads/fatalPayload.js';
import { InfoPayload, infoPayloadSchema } from './payloads/infoPayload.js';
import { LogPayload, logPayloadSchema } from './payloads/logPayload.js';
import { WarnPayload, warnPayloadSchema } from './payloads/warnPayload.js';
import { Injectable, Inject } from '../../../dependencyInjection/decorators.js';
import { Validator } from '../../../validator/validator.js';
import { LoggerClient } from '../../clients/loggerClient/loggerClient.js';
import { loggerModuleSymbols } from '../../loggerModuleSymbols.js';

@Injectable()
export class LoggerServiceImpl implements LoggerService {
  public constructor(
    @Inject(loggerModuleSymbols.loggerClient)
    private readonly loggerClient: LoggerClient,
  ) {}

  public fatal(input: FatalPayload): void {
    const { message, context } = Validator.validate(fatalPayloadSchema, input);

    this.loggerClient.fatal({ context: context ?? {} }, message);
  }

  public error(input: ErrorPayload): void {
    const { message, context } = Validator.validate(errorPayloadSchema, input);

    this.loggerClient.error({ context: context ?? {} }, message);
  }

  public warn(input: WarnPayload): void {
    const { message, context } = Validator.validate(warnPayloadSchema, input);

    this.loggerClient.warn({ context: context ?? {} }, message);
  }

  public info(input: InfoPayload): void {
    const { message, context } = Validator.validate(infoPayloadSchema, input);

    this.loggerClient.info({ context: context ?? {} }, message);
  }

  public debug(input: DebugPayload): void {
    const { message, context } = Validator.validate(debugPayloadSchema, input);

    this.loggerClient.debug({ context: context ?? {} }, message);
  }

  public log(input: LogPayload): void {
    const { message, context } = Validator.validate(logPayloadSchema, input);

    this.loggerClient.info({ context: context ?? {} }, message);
  }
}
