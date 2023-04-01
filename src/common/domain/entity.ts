import { UniqueId } from '../uniqueId';

export abstract class Entity<T> {
  protected readonly id: UniqueId;
  public readonly properties: T;

  public constructor(properties: T, id?: UniqueId) {
    this.id = id ? id : new UniqueId();
    this.properties = properties;
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
