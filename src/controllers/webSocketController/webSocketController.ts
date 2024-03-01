/* eslint-disable @typescript-eslint/no-explicit-any */
import { type WebSocket } from 'ws';

import { type FindBlocksFromBlockchainAction } from '../../actions/findBlocksFromBlockchainAction/findBlocksFromBlockchainAction.js';
import { type ApplicationMessage } from '../../common/types/applicationMessage.js';
import { ApplicationMessageType } from '../../common/types/applicationMessageType.js';
import { QueryBlocksMessage } from '../../common/types/queryBlocksMessage.js';

export class WebSocketController {
  public constructor(private readonly findBlocksFromBlockchainAction: FindBlocksFromBlockchainAction) {}

  public handleConnection(webSocket: WebSocket): void {
    webSocket.send(JSON.stringify(new QueryBlocksMessage()));
  }

  public async handleMessage(webSocket: WebSocket, messageInput: ApplicationMessage<any>): Promise<void> {
    if (messageInput.type === ApplicationMessageType.queryBlocksMessage) {
      const blocks = await this.findBlocksFromBlockchainAction.execute();

      webSocket.send(JSON.stringify(blocks));
    }
  }
}
