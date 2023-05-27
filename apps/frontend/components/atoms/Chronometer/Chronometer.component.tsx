import { Timer } from '@lib/recording';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MonoFont } from '~/fonts';

export type ChronometerProps = {
  timer: Timer;
  style?: React.CSSProperties;
};

export function Chronometer({ timer, ...props }: ChronometerProps) {
  const [time, setTime] = useState(timer.getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(timer.getTime());
    }, 90);

    return () => clearInterval(interval);
  }, []);

  return (
    <Wrapper style={props.style}>
      <div>{Timer.makeTimeStrMMSS(time)}</div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  font-family: ${MonoFont.style.fontFamily};
  font-size: 42px;
  font-weight: bold;
`;
