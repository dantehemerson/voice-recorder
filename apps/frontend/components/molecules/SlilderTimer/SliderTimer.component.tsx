import { Slider } from '@components/atoms';
import React from 'react';
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
  return (
    <Wrapper>
      <Slider
        onChange={props.onChangePosition}
        value={props.currentTime}
        max={props.duration}
      />
      <TimerContainer>
        <span>{calculateTime(props.currentTime)}</span>
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
