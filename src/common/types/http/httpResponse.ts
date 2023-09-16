import { ValidationSchema } from '../../validation/validationSchema.js';
import { HttpStatusCode } from './httpStatusCode.js';

export const httpResponseSchema = ValidationSchema.object({
  statusCode: ValidationSchema.enum(HttpStatusCode),
  body: ValidationSchema.union([
    ValidationSchema.null(),
    ValidationSchema.record(ValidationSchema.string(), ValidationSchema.any()),
  ]),
});

export interface HttpResponse<Body = unknown> {
  readonly statusCode: HttpStatusCode;
  readonly body: Body;
}

export interface HttpOkResponse<Body = unknown> extends HttpResponse<Body> {
  readonly statusCode: typeof HttpStatusCode.ok;
}

export interface HttpCreatedResponse<Body = unknown> extends HttpResponse<Body> {
  readonly statusCode: typeof HttpStatusCode.created;
}

export interface HttpNoContentResponse<Body = unknown> extends HttpResponse<Body> {
  readonly statusCode: typeof HttpStatusCode.noContent;
}

export interface HttpNotFoundResponse<Body = unknown> extends HttpResponse<Body> {
  readonly statusCode: typeof HttpStatusCode.notFound;
}

export interface HttpBadRequestResponse<Body = unknown> extends HttpResponse<Body> {
  readonly statusCode: typeof HttpStatusCode.badRequest;
}
