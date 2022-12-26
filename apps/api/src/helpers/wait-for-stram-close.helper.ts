import { WriteStream } from 'fs';

export async function waitForStreamClose(stream: WriteStream): Promise<void> {
  stream.end();
  return new Promise(resolve => {
    stream.once('finish', () => {
      resolve();
    });
  });
}
