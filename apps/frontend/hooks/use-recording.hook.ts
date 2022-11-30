import { useMemo } from 'react';
import { Recording } from '../lib/recording';

export function useRecording(): Recording {
  const recording = useMemo(() => new Recording({}), []);

  return recording;
}
