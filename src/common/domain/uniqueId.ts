import { v4 } from 'uuid';

import { Identifier } from './identifier';

export class UniqueId extends Identifier<string | number> {
  public constructor(id?: string | number) {
    super(id ? id : v4());
  }
}
