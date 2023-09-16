/* eslint-disable @typescript-eslint/no-explicit-any */

import { Schema } from '../../validation/schema.js';
import { SchemaObject } from '../../validation/schemaObject.js';
import { SchemaType } from '../../validation/schemaType.js';
import { Validator } from '../../validation/validator.js';
import { HttpMethodName } from './httpMethodName.js';
import { HttpRequest } from './httpRequest.js';
import { httpResponseSchema } from './httpResponse.js';
import { HttpRouteHandler } from './httpRouteHandler.js';

const httpRouteSchemaSchema = Schema.object({
  request: Schema.object({
    body: Schema.unsafeType<SchemaObject>().optional(),
    queryParams: Schema.unsafeType<SchemaObject>().optional(),
    pathParams: Schema.unsafeType<SchemaObject>().optional(),
  }),
  response: Schema.record(
    Schema.string(),
    Schema.object({
      schema: Schema.union([Schema.unsafeType<SchemaObject>(), Schema.null()]),
    }),
  ),
});

const httpRouteInputSchema = Schema.object({
  method: Schema.enum(HttpMethodName),
  path: Schema.string().optional(),
  handler: Schema.function(
    Schema.tuple([Schema.unsafeType<HttpRequest<any, any, any>>()]),
    Schema.promise(httpResponseSchema),
  ),
  schema: httpRouteSchemaSchema,
});

export type HttpRouteInput = SchemaType<typeof httpRouteInputSchema>;

export class HttpRoute {
  public readonly method: HttpMethodName;
  public readonly path: string;
  public readonly handler: HttpRouteHandler;
  public readonly schema: SchemaType<typeof httpRouteSchemaSchema>;

  public constructor(input: HttpRouteInput) {
    const { method, path, handler, schema } = Validator.validate(httpRouteInputSchema, input);

    this.method = method;
    this.path = path ?? '';
    this.handler = handler;
    this.schema = schema;
  }
}
