import { type ApplicationMessageType } from './applicationMessageType.js';

export interface ApplicationMessage<Payload> {
  readonly type: ApplicationMessageType;
  readonly payload: Payload;
}
