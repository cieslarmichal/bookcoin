export interface HttpRequest<Body = any, QueryParams = any, PathParams = any> {
  readonly body: Body;
  readonly pathParams: PathParams;
  readonly queryParams: QueryParams;
}
