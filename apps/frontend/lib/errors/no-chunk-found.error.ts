export class NoChunksFoundError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'NoChunksFound';
  }
}
