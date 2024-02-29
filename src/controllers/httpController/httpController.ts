import {
  type AddBlockToBlockchainBody,
  addBlockToBlockchainBodySchema,
  type AddBlockToBlockchainResponseOkBody,
} from './schemas/addBlockToBlockchainSchema.js';
import { type CreateBlockchainResponseCreatedBody } from './schemas/createBlockchainSchema.js';
import { type FindBlocksFromBlockchainResponseOkBody } from './schemas/findBlocksFromBlockchainSchema.js';
import { type HttpController } from '../../../../common/types/http/httpController.js';
import { HttpMethodName } from '../../../../common/types/http/httpMethodName.js';
import { type HttpRequest } from '../../../../common/types/http/httpRequest.js';
import {
  type HttpCreatedResponse,
  type HttpBadRequestResponse,
  type HttpOkResponse,
} from '../../../../common/types/http/httpResponse.js';
import { type HttpRoute } from '../../../../common/types/http/httpRoute.js';
import { HttpStatusCode } from '../../../../common/types/http/httpStatusCode.js';
import { type ResponseErrorBody } from '../../../../common/types/http/responseErrorBody.js';
import { Inject, Injectable } from '../../../../libs/dependencyInjection/decorators.js';
import { type AddBlockToBlockchainCommandHandler } from '../../../application/actions/addBlockToBlockchainCommandHandler/addBlockToBlockchainCommandHandler.js';
import { type CreateBlockchainCommandHandler } from '../../../application/actions/createBlockchainCommandHandler/createBlockchainCommandHandler.js';
import { type FindBlocksFromBlockchainQueryHandler } from '../../../application/actions/findBlocksFromBlockchainQueryHandler/findBlocksFromBlockchainQueryHandler.js';
import { BlockchainAlreadyExistsError } from '../../../application/errors/blockchainAlreadyExistsError.js';
import { BlockchainNotFoundError } from '../../../application/errors/blockchainNotFoundError.js';
import { blockchainModuleSymbols } from '../../../blockchainModuleSymbols.js';

@Injectable()
export class BlockchainHttpController implements HttpController {
  public readonly basePath = 'blockchain';

  public constructor(
    @Inject(blockchainModuleSymbols.createBlockchainCommandHandler)
    private readonly createBlockchainCommandHandler: CreateBlockchainCommandHandler,
    @Inject(blockchainModuleSymbols.addBlockToBlockchainCommandHandler)
    private readonly addBlockToBlockchainCommandHandler: AddBlockToBlockchainCommandHandler,
    @Inject(blockchainModuleSymbols.findBlocksFromBlockchainQueryHandler)
    private readonly findBlocksFromBlockchainQueryHandler: FindBlocksFromBlockchainQueryHandler,
  ) {}

  public getHttpRoutes(): HttpRoute[] {
    return [
      {
        method: HttpMethodName.post,
        path: '',
        handler: this.createBlockchain.bind(this),
        schema: {
          request: {},
        },
      },
      {
        method: HttpMethodName.post,
        path: 'blocks',
        handler: this.addBlockToBlockchain.bind(this),
        schema: {
          request: {
            body: addBlockToBlockchainBodySchema,
          },
        },
      },
      {
        method: HttpMethodName.get,
        path: 'blocks',
        handler: this.findBlocksFromBlockchain.bind(this),
        schema: {
          request: {},
        },
      },
    ];
  }

  private async createBlockchain(): Promise<
    HttpCreatedResponse<CreateBlockchainResponseCreatedBody> | HttpBadRequestResponse<ResponseErrorBody>
  > {
    try {
      const { blocks } = await this.createBlockchainCommandHandler.execute();

      return { statusCode: HttpStatusCode.created, body: { data: { blocks } } };
    } catch (error) {
      if (error instanceof BlockchainAlreadyExistsError) {
        return { statusCode: HttpStatusCode.badRequest, body: { error: { name: error.name, message: error.message } } };
      }

      throw error;
    }
  }

  private async addBlockToBlockchain(
    request: HttpRequest<AddBlockToBlockchainBody>,
  ): Promise<HttpOkResponse<AddBlockToBlockchainResponseOkBody> | HttpBadRequestResponse<ResponseErrorBody>> {
    const { blockData } = request.body;

    try {
      const { blocks } = await this.addBlockToBlockchainCommandHandler.execute({ blockData });

      return { statusCode: HttpStatusCode.ok, body: { data: { blocks } } };
    } catch (error) {
      if (error instanceof BlockchainNotFoundError) {
        return { statusCode: HttpStatusCode.badRequest, body: { error: { name: error.name, message: error.message } } };
      }

      throw error;
    }
  }

  private async findBlocksFromBlockchain(): Promise<
    HttpOkResponse<FindBlocksFromBlockchainResponseOkBody> | HttpBadRequestResponse<ResponseErrorBody>
  > {
    try {
      const { blocks } = await this.findBlocksFromBlockchainQueryHandler.execute();

      return { statusCode: HttpStatusCode.ok, body: { data: blocks } };
    } catch (error) {
      if (error instanceof BlockchainNotFoundError) {
        return { statusCode: HttpStatusCode.badRequest, body: { error: { name: error.name, message: error.message } } };
      }

      throw error;
    }
  }
}
