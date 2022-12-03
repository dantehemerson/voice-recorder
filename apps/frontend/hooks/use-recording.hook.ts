import { useRef } from 'react';
import { Recording } from '../lib/recording';

interface UseRecordingOptions {
  removeBackgroundNoise: boolean;
  autoGainControl: boolean;
}

export function useRecording(options?: Partial<UseRecordingOptions>) {
  const recordingRef = useRef<Recording>(undefined);

  function initRecording() {
    console.log('initRecording');
    recordingRef.current = new Recording({
      removeBackgroundNoise: true,
      autoGainControl: true,
      ...options,
    });

    console.log('Recording initialized', recordingRef.current);
  }

  function clearRecording() {
    if (recordingRef.current) {
      recordingRef.current.onError = undefined;
      recordingRef.current.onStart = undefined;
      recordingRef.current.onStop = undefined;
      recordingRef.current.onPause = undefined;
      recordingRef.current.onResume = undefined;

      recordingRef.current = undefined;
    }
  }

  return {
    recordingRef,
    initRecording,
    clearRecording,
  };
}
