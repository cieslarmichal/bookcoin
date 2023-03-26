import {
  FindBlockchainQueryParameters,
  findBlockchainQueryParametersSchema,
  FindBlockchainResponseOkBody,
  findBlockchainResponseOkBodySchema,
} from './schemas/findBlockchainSchema.js';
import { HttpController } from '../../../common/http/httpController.js';
import { HttpMethodName } from '../../../common/http/httpMethodName.js';
import { HttpRequest } from '../../../common/http/httpRequest.js';
import { HttpOkResponse, HttpBadRequestResponse } from '../../../common/http/httpResponse.js';
import { HttpRoute } from '../../../common/http/httpRoute.js';
import { HttpStatusCode } from '../../../common/http/httpStatusCode.js';
import { responseErrorBodySchema, ResponseErrorBody } from '../../../common/http/responseErrorBodySchema.js';
import { Injectable } from '../../../libs/dependencyInjection/decorators.js';

@Injectable()
export class BlockchainHttpController implements HttpController {
  public readonly basePath = 'blockchain';

  public getHttpRoutes(): HttpRoute[] {
    return [
      new HttpRoute({
        method: HttpMethodName.get,
        handler: this.findBlockchain.bind(this),
        schema: {
          request: {
            queryParams: findBlockchainQueryParametersSchema,
          },
          response: {
            [HttpStatusCode.ok]: {
              schema: findBlockchainResponseOkBodySchema,
            },
            [HttpStatusCode.badRequest]: {
              schema: responseErrorBodySchema,
            },
          },
        },
      }),
    ];
  }

  private async findBlockchain(
    request: HttpRequest<undefined, FindBlockchainQueryParameters>,
  ): Promise<HttpOkResponse<FindBlockchainResponseOkBody> | HttpBadRequestResponse<ResponseErrorBody>> {
    const { id } = request.queryParams;

    console.log({ id });

    return {
      statusCode: HttpStatusCode.ok,
      body: {
        data: { blocks: [] },
      },
    };
  }
}
