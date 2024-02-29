import { type ApplicationMessage } from './applicationMessage.js';
import { ApplicationMessageType } from './applicationMessageType.js';

export class QueryBlocksMessage implements ApplicationMessage<null> {
  public readonly type = ApplicationMessageType.queryBlocksMessage;
  public readonly payload: null;

  public constructor() {
    this.payload = null;
  }
}
