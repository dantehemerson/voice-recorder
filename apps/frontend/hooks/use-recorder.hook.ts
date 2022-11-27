import { useMemo } from 'react';
import { Recorder } from '../lib/recorder';

export function useRecorder(): Recorder {
  const recorder = useMemo(() => new Recorder({}), []);

  return recorder;
}
