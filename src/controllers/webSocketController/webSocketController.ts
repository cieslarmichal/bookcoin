import { type WebSocket } from 'ws';

export class WebSocketController {
  public constructor(private readonly findBlocksFromBlockchainQueryHandler: FindBlocksFromBlockchainQueryHandler) {}

  public handleConnection(webSocket: WebSocket): void {
    webSocket.send(JSON.stringify(new QueryBlocksMessage()));
  }

  public async handleMessage(webSocket: WebSocket, messageInput: ApplicationMessage<any>): Promise<void> {
    if (messageInput.name === ApplicationMessageName.queryBlocksMessage) {
      const blocks = await this.findBlocksFromBlockchainQueryHandler.execute();

      webSocket.send(JSON.stringify(blocks));
    }
  }
}
