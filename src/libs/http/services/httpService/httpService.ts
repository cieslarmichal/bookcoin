import { HttpResponse } from '../../httpResponse.js';
import { HttpMethodName } from '../../../../common/types/http/httpMethodName.js';

export interface SendRequestPayload {
  readonly method: HttpMethodName;
  readonly url: string;
  readonly headers?: Record<string, string>;
  readonly queryParams?: Record<string, string>;
  readonly body?: any;
}

export interface HttpService {
  sendRequest(payload: SendRequestPayload): Promise<HttpResponse>;
}
