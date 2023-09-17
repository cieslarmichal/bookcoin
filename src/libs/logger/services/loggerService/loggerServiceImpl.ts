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

  public fatal(payload: FatalPayload): void {
    const { message, context } = Validator.validate(fatalPayloadSchema, payload);

    this.loggerClient.fatal({ context: context ?? {} }, message);
  }

  public error(payload: ErrorPayload): void {
    const { message, context } = Validator.validate(errorPayloadSchema, payload);

    this.loggerClient.error({ context: context ?? {} }, message);
  }

  public warn(payload: WarnPayload): void {
    const { message, context } = Validator.validate(warnPayloadSchema, payload);

    this.loggerClient.warn({ context: context ?? {} }, message);
  }

  public info(payload: InfoPayload): void {
    const { message, context } = Validator.validate(infoPayloadSchema, payload);

    this.loggerClient.info({ context: context ?? {} }, message);
  }

  public debug(payload: DebugPayload): void {
    const { message, context } = Validator.validate(debugPayloadSchema, payload);

    this.loggerClient.debug({ context: context ?? {} }, message);
  }

  public log(payload: LogPayload): void {
    const { message, context } = Validator.validate(logPayloadSchema, payload);

    this.loggerClient.info({ context: context ?? {} }, message);
  }
}
