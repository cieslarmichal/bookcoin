export interface ApplicationEvent<Payload> {
  readonly name: string;
  readonly payload: Payload;
}
