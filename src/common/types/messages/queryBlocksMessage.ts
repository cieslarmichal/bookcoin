import { ApplicationMessage } from './applicationMessage.js';
import { ApplicationMessageName } from './applicationMessageName.js';

export class QueryBlocksMessage implements ApplicationMessage<null> {
  public readonly name = ApplicationMessageName.queryBlocksMessage;
  public readonly payload: null;

  public constructor() {
    this.payload = null;
  }
}
