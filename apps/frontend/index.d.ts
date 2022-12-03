/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.svg' {
  const content: any;
  export const ReactComponent: any;
  export default content;
}

interface __MSWindow extends Window {
  msCrypto: Crypto;
}

type MsWindow = typeof globalThis & __MSWindow;

interface __WebkitWindow extends Window {
  webkitAudioContext: typeof AudioContext;
}

type WebkitWindow = typeof globalThis & __WebkitWindow;
