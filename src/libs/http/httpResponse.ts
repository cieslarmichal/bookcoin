import { HttpStatusCode } from '../../common/http/httpStatusCode.js';

export interface HttpResponse {
  readonly statusCode: HttpStatusCode;
  readonly body: unknown;
}
