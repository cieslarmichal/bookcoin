export interface ApplicationMessage<Payload> {
  readonly name: string;
  readonly payload: Payload;
}
