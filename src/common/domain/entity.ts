import { UniqueId } from './uniqueId';

export abstract class Entity<T> {
  protected readonly uniqueId: UniqueId;
  public readonly properties: T;

  public constructor(properties: T, uniqueId?: UniqueId) {
    this.uniqueId = uniqueId ? uniqueId : new UniqueId();
    this.properties = properties;
  }

  public equals(object?: Entity<T>): boolean {
    if (object == null || object == undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    return this.uniqueId.equals(object.uniqueId);
  }
}
