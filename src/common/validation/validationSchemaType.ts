import { ZodTypeAny, infer as zodInfer } from 'zod';

export type ValidationSchemaType<S extends ZodTypeAny> = zodInfer<S>;
