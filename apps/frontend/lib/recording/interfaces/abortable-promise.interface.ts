// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class AbortablePromise<T = any> extends Promise<T> {
  public abort: () => void;
}
