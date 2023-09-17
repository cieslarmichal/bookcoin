import { DependencyInjectionContainer } from './dependencyInjectionContainer.js';
import { DependencyInjectionModule } from './dependencyInjectionModule.js';

export interface CreatePayload {
  readonly modules: DependencyInjectionModule[];
}

export class DependencyInjectionContainerFactory {
  public static create(payload: CreatePayload): DependencyInjectionContainer {
    const { modules } = payload;

    const container = new DependencyInjectionContainer();

    for (const module of modules) {
      module.declareBindings(container);
    }

    return container;
  }
}
