import { Slider } from '@components/atoms';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MonoFont } from '~/fonts';

type SliderTimerProps = {
  currentTime?: number;
  duration?: number;
  onChangePosition?: (newPosition: number) => void;
};

const calculateTime = (secs = 0) => {
  const minutes = Math.floor(secs / 60);
  const seconds = Math.floor(secs % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
};

export function SliderTimer(props: SliderTimerProps) {
  const [ownValue, setOwnValue] = useState(props.currentTime || 0);
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    if (!isSliding) {
      setOwnValue(props.currentTime || 0);
    }
  }, [props.currentTime]);

  return (
    <Wrapper>
      <Slider
        onMouseUp={e => {
          props.onChangePosition?.(ownValue);
          setIsSliding(false);
        }}
        onMouseDown={() => setIsSliding(true)}
        onChange={newValue => setOwnValue(newValue)}
        value={ownValue}
        max={props.duration}
      />
      <TimerContainer>
        <span>{calculateTime(isSliding ? ownValue : props.currentTime)}</span>
        <span>{calculateTime(props.duration)}</span>
      </TimerContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
`;

const TimerContainer = styled.div`
  display: flex;
  justify-content: space-between;

  span {
    font-size: 0.8rem;
    font-family: ${MonoFont.style.fontFamily};
    color: #a9afb2;
  }
`;
