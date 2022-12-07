export class AbortRequestError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'AbortError';
  }
}
