import { useRef } from 'react';
import { Recording } from '../lib/recording';

interface UseRecordingOptions {
  removeBackgroundNoise: boolean;
  autoGainControl: boolean;
}

export function useRecording(options?: Partial<UseRecordingOptions>) {
  const recordingRef = useRef<Recording>(undefined);

  function initRecording() {
    recordingRef.current = new Recording({
      removeBackgroundNoise: true,
      autoGainControl: true,
      ...options,
    });
  }

  function clearRecording() {
    if (recordingRef.current) {
      recordingRef.current.onError = undefined;
      recordingRef.current.onDataAvailable = undefined;
      recordingRef.current.onStart = undefined;
      recordingRef.current.onStop = undefined;
      recordingRef.current.onPause = undefined;
      recordingRef.current.onResume = undefined;

      recordingRef.current = undefined;
    }
  }

  return {
    recording: recordingRef.current,
    initRecording,
    clearRecording,
  };
}
