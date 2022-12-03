import { useState } from 'react';
import { Recording } from '../lib/recording';

interface UseRecordingOptions {
  removeBackgroundNoise: boolean;
  autoGainControl: boolean;
}

export function useRecording(options?: Partial<UseRecordingOptions>) {
  /** Create as an object to avoid unnecessary rerenders */
  const [recordingState] = useState<{ recording: Recording }>({
    recording: undefined,
  });

  function initRecording() {
    recordingState.recording = new Recording({
      removeBackgroundNoise: true,
      autoGainControl: true,
      ...options,
    });
  }

  function clearRecording() {
    if (recordingState.recording) {
      recordingState.recording.onError = undefined;
      recordingState.recording.onStart = undefined;
      recordingState.recording.onStop = undefined;
      recordingState.recording.onPause = undefined;
      recordingState.recording.onResume = undefined;

      recordingState.recording = undefined;
    }
  }

  return {
    get recording(): Recording {
      return recordingState.recording;
    },
    initRecording,
    clearRecording,
  };
}
