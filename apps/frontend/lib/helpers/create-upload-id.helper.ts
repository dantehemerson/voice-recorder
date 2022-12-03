import baseX from 'base-x';

const BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const base62 = baseX(BASE62);

export function createUploadId(): string {
  const randomValues = (
    window.crypto || (window as MsWindow).msCrypto
  ).getRandomValues(new Uint8Array(16));

  return base62.encode(randomValues);
}
