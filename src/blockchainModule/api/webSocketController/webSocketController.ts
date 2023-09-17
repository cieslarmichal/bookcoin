import { WebSocket } from 'ws';
import { ApplicationMessage } from '../../../common/types/messages/applicationMessage.js';
import { ApplicationMessageName } from '../../../common/types/messages/applicationMessageName.js';
import { QueryBlocksMessage } from '../../../common/types/messages/queryBlocksMessage.js';
import { Inject, Injectable } from '../../../libs/dependencyInjection/decorators.js';
import { FindBlocksFromBlockchainQueryHandler } from '../../application/queryHandlers/findBlocksFromBlockchainQueryHandler/findBlocksFromBlockchainQueryHandler.js';
import { blockchainModuleSymbols } from '../../blockchainModuleSymbols.js';

@Injectable()
export class WebSocketController {
  public constructor(
    @Inject(blockchainModuleSymbols.findBlocksFromBlockchainQueryHandler)
    private readonly findBlocksFromBlockchainQueryHandler: FindBlocksFromBlockchainQueryHandler,
  ) {}

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
