/* eslint-disable @typescript-eslint/no-explicit-any */
import { isEdge } from '../browser/browser.helpers';

export async function captureMicrophone(): Promise<MediaStream> {
  try {
    if (
      typeof navigator.mediaDevices === 'undefined' ||
      !navigator.mediaDevices.getUserMedia
    ) {
      alert('This browser does not supports WebRTC getUserMedia API.');

      if ((navigator as any).getUserMedia) {
        alert('This browser seems supporting deprecated getUserMedia API.');
      }
    }

    const mic = await navigator.mediaDevices.getUserMedia({
      audio: isEdge()
        ? true
        : {
            echoCancellation: false,
          },
      video: false,
    });

    return mic;
  } catch (error) {
    alert('Unable to capture your microphone. Please check console logs.');
    console.error(error);
  }
}
