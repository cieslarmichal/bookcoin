import { HttpStatusCode } from '../../common/types/http/httpStatusCode.js';

export interface HttpResponse {
  readonly statusCode: HttpStatusCode;
  readonly body: unknown;
}
