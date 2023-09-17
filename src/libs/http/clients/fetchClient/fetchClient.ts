import { Response } from 'node-fetch';

export interface FetchPayload {
  readonly url: string;
  readonly init?: any;
}

export interface FetchClient {
  fetch(payload: FetchPayload): Promise<Response>;
}
