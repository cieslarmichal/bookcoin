import { stringify } from 'querystring';

import { HttpService, SendRequestPayload } from './httpService.js';
import { LoggerService } from '../../../logger/services/loggerService/loggerService.js';
import { FetchClient } from '../../clients/fetchClient/fetchClient.js';
import { HttpServiceError } from '../../errors/httpServiceError.js';
import { HttpResponse } from '../../httpResponse.js';
import { Inject, Injectable } from '../../../dependencyInjection/decorators.js';
import { httpModuleSymbols } from '../../httpModuleSymbols.js';
import { loggerModuleSymbols } from '../../../logger/loggerModuleSymbols.js';

@Injectable()
export class HttpServiceImpl implements HttpService {
  public constructor(
    @Inject(httpModuleSymbols.fetchClient) private readonly fetchClient: FetchClient,
    @Inject(loggerModuleSymbols.loggerService) private readonly loggerService: LoggerService,
  ) {}

  public async sendRequest(payload: SendRequestPayload): Promise<HttpResponse> {
    const { method, url: initialUrl, headers, queryParams, body: requestBody } = payload;

    const body = JSON.stringify(requestBody);

    let url = initialUrl;

    if (queryParams && Object.keys(queryParams).length) {
      url += `?${stringify(queryParams)}`;
    }

    this.loggerService.debug({
      message: 'Sending http request...',
      context: { url, method, body, headers },
    });

    try {
      const response = await this.fetchClient.fetch({
        url,
        init: {
          method,
          headers: headers as never,
          body,
        },
      });

      const responseBody = await response.json();

      this.loggerService.debug({
        message: 'Http request sent.',
        context: { responseBody, statusCode: response.status },
      });

      return { body: responseBody, statusCode: response.status };
    } catch (error) {
      const { name, message } = error instanceof Error ? error : { name: '', message: JSON.stringify(error) };

      throw new HttpServiceError({ name, message });
    }
  }
}
