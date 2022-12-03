export class Utils {
  static mergeObjects<T, U>(objectA: T, objectB: U): T & U {
    return Object.assign({}, objectA, objectB);
  }
}
