import { DependencyInjectionContainer } from './dependencyInjectionContainer.js';

export interface DependencyInjectionModule {
  declareBindings(container: DependencyInjectionContainer): Promise<void>;
}
