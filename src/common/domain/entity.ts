import { UniqueId } from './uniqueId';

export abstract class Entity<T> {
  public readonly id: UniqueId;

  public constructor(id?: UniqueId) {
    this.id = id || new UniqueId();
  }

  public equals(object?: Entity<T>): boolean {
    if (object == null || object == undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    return this.id.equals(object.id);
  }
}
