import { Schema } from '../../validator/schema.js';
import { SchemaType } from '../../validator/schemaType.js';
import { DependencyInjectionModule } from '../dependencyInjectionModule.js';

export const createPayloadSchema = Schema.object({
  modules: Schema.array(Schema.unsafeType<DependencyInjectionModule>()),
});

export type CreatePayload = SchemaType<typeof createPayloadSchema>;
