import { DebugPayload } from './payloads/debugPayload.js';
import { ErrorPayload } from './payloads/errorPayload.js';
import { FatalPayload } from './payloads/fatalPayload.js';
import { InfoPayload } from './payloads/infoPayload.js';
import { LogPayload } from './payloads/logPayload.js';
import { WarnPayload } from './payloads/warnPayload.js';

export interface LoggerService {
  fatal(input: FatalPayload): void;
  error(input: ErrorPayload): void;
  warn(input: WarnPayload): void;
  info(input: InfoPayload): void;
  debug(input: DebugPayload): void;
  log(input: LogPayload): void;
}
