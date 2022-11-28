import { useMemo } from 'react';
import { RecordingStore } from '../lib/recording-store';

export function useRecordingStore(): RecordingStore {
  const recordingStore = useMemo(() => new RecordingStore(), []);

  return recordingStore;
}
