import { Timer } from '@lib/recording';
import { useMemo } from 'react';

export function useTimer(): Timer {
  const timer = useMemo(() => new Timer(), []);

  return timer;
}
