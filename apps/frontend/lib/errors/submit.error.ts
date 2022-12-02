export class SubmitError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'SubmitError';
  }
}
