export interface RetryableFetchInitOptions extends RequestInit {
  parseJson?: boolean;
  resolveWhenNotOk?: boolean;
}
