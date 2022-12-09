import { Timer } from '@lib/recording/timer';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

export type ChronometerProps = {
  timer: Timer;
};

export function Chronometer({ timer }: ChronometerProps) {
  const [time, setTime] = useState(timer.getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(timer.getTime());
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <Wrapper>
      <div>{Timer.makeTimeStrMMSS(time)}</div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  font-family: 'Courier New', Courier, monospace;
  font-size: 20px;
  font-weight: 400;
`;
