import {
  AddBlockToBlockchainBody,
  addBlockToBlockchainBodySchema,
  AddBlockToBlockchainResponseOkBody,
  addBlockToBlockchainResponseOkBodySchema,
} from './schemas/addBlockToBlockchainSchema.js';
import {
  FindBlocksFromBlockchainResponseOkBody,
  findBlocksFromBlockchainResponseOkBodySchema,
} from './schemas/findBlocksFromBlockchainSchema.js';
import { HttpController } from '../../../../common/http/httpController.js';
import { HttpMethodName } from '../../../../common/http/httpMethodName.js';
import { HttpRequest } from '../../../../common/http/httpRequest.js';
import { HttpOkResponse, HttpBadRequestResponse } from '../../../../common/http/httpResponse.js';
import { HttpRoute } from '../../../../common/http/httpRoute.js';
import { HttpStatusCode } from '../../../../common/http/httpStatusCode.js';
import { responseErrorBodySchema, ResponseErrorBody } from '../../../../common/http/responseErrorBodySchema.js';
import { Inject, Injectable } from '../../../../libs/dependencyInjection/decorators.js';
import { AddBlockToBlockchainCommandHandler } from '../../../application/commandHandlers/addBlockToBlockchainCommandHandler/addBlockToBlockchainCommandHandler.js';
import { FindBlocksFromBlockchainQueryHandler } from '../../../application/queryHandlers/findBlocksFromBlockchainQueryHandler/findBlocksFromBlockchainQueryHandler.js';
import { blockchainModuleSymbols } from '../../../blockchainModuleSymbols.js';
import {
  CreateBlockchainResponseCreatedBody,
  createBlockchainResponseCreatedBodySchema,
} from './schemas/createBlockchainSchema.js';

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
      new HttpRoute({
        method: HttpMethodName.post,
        handler: this.createBlockchain.bind(this),
        schema: {
          response: {
            [HttpStatusCode.created]: {
              schema: createBlockchainResponseCreatedBodySchema,
            },
            [HttpStatusCode.badRequest]: {
              schema: responseErrorBodySchema,
            },
          },
        },
      }),
      new HttpRoute({
        method: HttpMethodName.post,
        path: 'blocks',
        handler: this.addBlockToBlockchain.bind(this),
        schema: {
          request: {
            body: addBlockToBlockchainBodySchema,
          },
          response: {
            [HttpStatusCode.ok]: {
              schema: addBlockToBlockchainResponseOkBodySchema,
            },
            [HttpStatusCode.badRequest]: {
              schema: responseErrorBodySchema,
            },
          },
        },
      }),
      new HttpRoute({
        method: HttpMethodName.get,
        path: 'blocks',
        handler: this.findBlocksFromBlockchain.bind(this),
        schema: {
          request: {},
          response: {
            [HttpStatusCode.ok]: {
              schema: findBlocksFromBlockchainResponseOkBodySchema,
            },
            [HttpStatusCode.badRequest]: {
              schema: responseErrorBodySchema,
            },
          },
        },
      }),
    ];
  }

  private async createBlockchain(): Promise<
    HttpOkResponse<CreateBlockchainResponseCreatedBody> | HttpBadRequestResponse<ResponseErrorBody>
  > {
    await this.addBlockToBlockchainCommandHandler.execute({ blockData });

    return { statusCode: HttpStatusCode.created, body: { data: { blocks } } };
  }

  private async addBlockToBlockchain(
    request: HttpRequest<AddBlockToBlockchainBody>,
  ): Promise<HttpOkResponse<AddBlockToBlockchainResponseOkBody> | HttpBadRequestResponse<ResponseErrorBody>> {
    const { blockData } = request.body;

    console.log({ blockData });

    await this.addBlockToBlockchainCommandHandler.execute({ blockData });

    return { statusCode: HttpStatusCode.ok, body: null };
  }

  private async findBlocksFromBlockchain(): Promise<
    HttpOkResponse<FindBlocksFromBlockchainResponseOkBody> | HttpBadRequestResponse<ResponseErrorBody>
  > {
    const { blocks } = await this.findBlocksFromBlockchainQueryHandler.execute();

    return { statusCode: HttpStatusCode.ok, body: { data: { blocks } } };
  }
}
