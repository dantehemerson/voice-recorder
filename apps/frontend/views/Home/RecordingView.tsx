import styled from 'styled-components';
import { PauseButton } from '../../components/PauseButton/PauseButton';
import { StopButton } from '../../components/StopButton/StopButton';
import { Timer } from '../../components/Timer/Timer';

type RecordingViewProps = {
  onClick: () => void;
};

export function RecordingView({ onClick }: RecordingViewProps) {
  return (
    <Container>
      <TimerContainer>
        <Timer mm={10} ss={11} hideMs={true} />
      </TimerContainer>
      <ButtonsContainer>
        <PauseButton onClick={onClick} />
        <StopButton onClick={onClick} />
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
