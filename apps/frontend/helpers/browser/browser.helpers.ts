/* eslint-disable @typescript-eslint/no-explicit-any */
export function isEdge(): boolean {
  return (
    navigator.userAgent.indexOf('Edge') !== -1 &&
    (!!(navigator as any).msSaveOrOpenBlob || !!(navigator as any).msSaveBlob)
  );
}

export function isSafari(): boolean {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}
