import { PauseButton, StopButton } from '@components/atoms';
import { ReactNode, useState } from 'react';
import styled from 'styled-components';

type RecordingViewProps = {
  chronometer: ReactNode;
  onClickStop: () => void;
  onClickPlayPause: (pause: boolean) => void;
};

export function RecordingView({
  chronometer,
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
      <ChronometerContainer>{chronometer}</ChronometerContainer>
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

const ChronometerContainer = styled.div`
  display: flex;
  height: 50px;
  align-items: center;
`;

const ButtonsContainer = styled.div`
  display: flex;
`;
