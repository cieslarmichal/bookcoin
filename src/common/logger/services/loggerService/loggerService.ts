import { type Logger } from 'pino';

export interface LogPayload {
  readonly message: string;
  readonly [key: string]: unknown;
}

export class LoggerService {
  public constructor(private readonly loggerClient: Logger) {}

  public fatal(payload: LogPayload): void {
    const { message, ...context } = payload;

    this.loggerClient.fatal({ ...context }, message);
  }

  public error(payload: LogPayload): void {
    const { message, ...context } = payload;

    this.loggerClient.error({ ...context }, message);
  }

  public warn(payload: LogPayload): void {
    const { message, ...context } = payload;

    this.loggerClient.warn({ ...context }, message);
  }

  public info(payload: LogPayload): void {
    const { message, ...context } = payload;

    this.loggerClient.info({ ...context }, message);
  }

  public debug(payload: LogPayload): void {
    const { message, ...context } = payload;

    this.loggerClient.debug({ ...context }, message);
  }

  public log(payload: LogPayload): void {
    const { message, ...context } = payload;

    this.loggerClient.info({ ...context }, message);
  }
}
