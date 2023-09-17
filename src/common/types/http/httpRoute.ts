import { ValidationSchemaObject } from '../../validation/validationSchemaObject.js';
import { HttpMethodName } from './httpMethodName.js';
import { HttpRouteHandler } from './httpRouteHandler.js';

export interface HttpRoute {
  readonly method: HttpMethodName;
  readonly path: string;
  readonly handler: HttpRouteHandler;
  readonly schema: {
    readonly request: {
      body?: ValidationSchemaObject;
      queryParams?: ValidationSchemaObject;
      pathParams?: ValidationSchemaObject;
    };
  };
}
