import { DependencyInjectionContainer } from './dependencyInjectionContainer.js';
import { CreatePayload, createPayloadSchema } from './payloads/createPayload.js';
import { Validator } from '../validator/validator.js';

export class DependencyInjectionContainerFactory {
  public static async create(input: CreatePayload): Promise<DependencyInjectionContainer> {
    const { modules } = Validator.validate(createPayloadSchema, input);

    const container = new DependencyInjectionContainer();

    for (const module of modules) {
      await module.declareBindings(container);
    }

    return container;
  }
}
