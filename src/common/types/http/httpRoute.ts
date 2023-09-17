/* eslint-disable @typescript-eslint/no-explicit-any */

import { ValidationSchema } from '../../validation/validationSchema.js';
import { ValidationSchemaObject } from '../../validation/validationSchemaObject.js';
import { ValidationSchemaType } from '../../validation/validationSchemaType.js';
import { Validator } from '../../validation/validator.js';
import { HttpMethodName } from './httpMethodName.js';
import { HttpRequest } from './httpRequest.js';
import { httpResponseSchema } from './httpResponse.js';
import { HttpRouteHandler } from './httpRouteHandler.js';

const httpRouteSchemaSchema = ValidationSchema.object({
  request: ValidationSchema.object({
    body: ValidationSchema.unsafeType<ValidationSchemaObject>().optional(),
    queryParams: ValidationSchema.unsafeType<ValidationSchemaObject>().optional(),
    pathParams: ValidationSchema.unsafeType<ValidationSchemaObject>().optional(),
  }),
  response: ValidationSchema.record(
    ValidationSchema.string(),
    ValidationSchema.object({
      schema: ValidationSchema.union([ValidationSchema.unsafeType<ValidationSchemaObject>(), ValidationSchema.null()]),
    }),
  ),
});

const httpRouteInputSchema = ValidationSchema.object({
  method: ValidationSchema.enum(HttpMethodName),
  path: ValidationSchema.string().optional(),
  handler: ValidationSchema.function(
    ValidationSchema.tuple([ValidationSchema.unsafeType<HttpRequest<any, any, any>>()]),
    ValidationSchema.promise(httpResponseSchema),
  ),
  schema: httpRouteSchemaSchema,
});

export type HttpRouteInput = ValidationSchemaType<typeof httpRouteInputSchema>;

export class HttpRoute {
  public readonly method: HttpMethodName;
  public readonly path: string;
  public readonly handler: HttpRouteHandler;
  public readonly schema: ValidationSchemaType<typeof httpRouteSchemaSchema>;

  public constructor(payload: HttpRouteInput) {
    const { method, path, handler, schema } = Validator.validate(httpRouteInputSchema, payload);

    this.method = method;
    this.path = path ?? '';
    this.handler = handler;
    this.schema = schema;
  }
}
