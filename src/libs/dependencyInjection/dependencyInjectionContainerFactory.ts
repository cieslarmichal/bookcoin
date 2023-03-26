import { DependencyInjectionContainer } from './dependencyInjectionContainer.js';
import { CreatePayload, createPayloadSchema } from './payloads/createPayload.js';
import { Validator } from '../validator/validator.js';

export class DependencyInjectionContainerFactory {
  public static create(input: CreatePayload): DependencyInjectionContainer {
    const { modules } = Validator.validate(createPayloadSchema, input);

    const container = new DependencyInjectionContainer();

    for (const module of modules) {
      module.declareBindings(container);
    }

    return container;
  }
}
