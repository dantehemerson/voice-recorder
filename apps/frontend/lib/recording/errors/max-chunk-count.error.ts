export class MaxChunkCountError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'MaxChunkCount';
  }
}
