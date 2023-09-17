import { Schema } from 'zod';

import { ValidationError } from './errors/validationError.js';

export class Validator {
  public static validate<T>(schema: Schema<T>, payload: T): T {
    const result = schema.safeParse(payload);

    if (!result.success) {
      throw new ValidationError({
        message: result.error.message,
        issues: result.error.issues,
        target: payload,
      });
    }

    return result.data;
  }
}
