import { useMemo } from 'react';
import { Recorder } from '../lib/recorder';

export function useRecorder(): Recorder {
  /** Create unique instance of Recorder class */

  const recorder = useMemo(() => new Recorder({}), []);

  return recorder;
}
