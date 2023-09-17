import { DebugPayload } from './payloads/debugPayload.js';
import { ErrorPayload } from './payloads/errorPayload.js';
import { FatalPayload } from './payloads/fatalPayload.js';
import { InfoPayload } from './payloads/infoPayload.js';
import { LogPayload } from './payloads/logPayload.js';
import { WarnPayload } from './payloads/warnPayload.js';

export interface LoggerService {
  fatal(payload: FatalPayload): void;
  error(payload: ErrorPayload): void;
  warn(payload: WarnPayload): void;
  info(payload: InfoPayload): void;
  debug(payload: DebugPayload): void;
  log(payload: LogPayload): void;
}
