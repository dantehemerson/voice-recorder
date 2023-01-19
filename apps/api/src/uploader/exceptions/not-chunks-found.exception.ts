export class NotChunksFoundException extends Error {
  constructor() {
    super('No chunks found');
  }
}
