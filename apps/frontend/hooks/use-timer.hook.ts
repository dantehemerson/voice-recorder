import { Timer } from '@lib/recording/timer';
import { useMemo } from 'react';

export function useTimer(): Timer {
  const timer = useMemo(() => new Timer(), []);

  return timer;
}
