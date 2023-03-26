import fetch, { Response } from 'node-fetch';

import { FetchClient } from './fetchClient.js';
import { FetchPayload, fetchPayloadSchema } from './payloads/fetchPayload.js';
import { Injectable } from '../../../dependencyInjection/decorators.js';
import { Validator } from '../../../validator/validator.js';

@Injectable()
export class FetchClientImpl implements FetchClient {
  public async fetch(input: FetchPayload): Promise<Response> {
    const { url, init } = Validator.validate(fetchPayloadSchema, input);

    return fetch(url, init);
  }
}
