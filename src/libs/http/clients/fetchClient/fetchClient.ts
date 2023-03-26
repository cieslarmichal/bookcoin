import { Response } from 'node-fetch';

import { FetchPayload } from './payloads/fetchPayload.js';

export interface FetchClient {
  fetch(input: FetchPayload): Promise<Response>;
}
