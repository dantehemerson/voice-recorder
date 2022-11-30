import { useMemo } from 'react';
import { Timer } from '../lib/timer';

export function useTimer(): Timer {
  const timer = useMemo(() => new Timer(), []);

  return timer;
}
