import fetch, { Response } from 'node-fetch';

import { FetchClient, FetchPayload } from './fetchClient.js';
import { Injectable } from '../../../dependencyInjection/decorators.js';

@Injectable()
export class FetchClientImpl implements FetchClient {
  public async fetch(payload: FetchPayload): Promise<Response> {
    const { url, init } = payload;

    return fetch(url, init);
  }
}
