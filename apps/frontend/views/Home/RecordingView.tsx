import { useState } from 'react';
import styled from 'styled-components';
import { PauseButton } from '../../components/PauseButton/PauseButton';
import { StopButton } from '../../components/StopButton/StopButton';
import { Chronometer } from '../../components/Chronometer/Chronometer';
import { Timer } from '../../lib/timer';

type RecordingViewProps = {
  timer: Timer;
  onClickStop: () => void;
  onClickPlayPause: (pause: boolean) => void;
};

export function RecordingView({
  timer,
  onClickStop,
  onClickPlayPause,
}: RecordingViewProps) {
  const [isPaused, setIsPaused] = useState(false);

  function handlePlayPause() {
    const pause = !isPaused ? true : false;
    onClickPlayPause(pause);
    setIsPaused(!isPaused);
  }

  return (
    <Container>
      <TimerContainer>
        <Chronometer timer={timer} />
      </TimerContainer>
      <ButtonsContainer>
        <PauseButton isPaused={isPaused} onClick={handlePlayPause} />
        <StopButton onClick={onClickStop} />
      </ButtonsContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid red;
  height: 100%;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
`;

const TimerContainer = styled.div`
  display: flex;
  height: 50px;
  align-items: center;
`;

const ButtonsContainer = styled.div`
  display: flex;
`;
