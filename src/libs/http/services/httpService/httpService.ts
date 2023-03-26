import { SendRequestPayload } from './payloads/sendRequestPayload.js';
import { HttpResponse } from '../../httpResponse.js';

export interface HttpService {
  sendRequest(input: SendRequestPayload): Promise<HttpResponse>;
}
