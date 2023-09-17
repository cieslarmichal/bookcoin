import { LogContext } from '../../logContext.js';

export interface LogPayload {
  readonly message: string;
  readonly context?: LogContext;
}

export interface LoggerService {
  fatal(payload: LogPayload): void;
  error(payload: LogPayload): void;
  warn(payload: LogPayload): void;
  info(payload: LogPayload): void;
  debug(payload: LogPayload): void;
  log(payload: LogPayload): void;
}
