import { isEdge, isSafari } from '../browser/browser.helpers';
import { Recorder } from '../recordrtc';

export interface InitRecorderOptions {
  mic: MediaStream;
}

export function initRecorder({ mic }: InitRecorderOptions): MediaStream {
  const options: any = {
    type: 'audio',
    numberOfAudioChannels: isEdge() ? 1 : 2,
    checkForInactiveTracks: true,
    bufferSize: 16384,
  };

  if (isSafari() || isEdge()) {
    options.recorderType = Recorder.StereoAudioRecorder;
  }

  if (
    navigator.platform &&
    navigator.platform.toString().toLowerCase().indexOf('win') === -1
  ) {
    options.sampleRate = 48000; // or 44100 or remove this line for default
  }

  if (isSafari()) {
    options.sampleRate = 44100;
    options.bufferSize = 4096;
    options.numberOfAudioChannels = 2;
  }

  const recorder = Recorder(mic, {});

  return recorder;
}
