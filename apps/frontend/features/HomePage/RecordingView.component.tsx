import { ReactNode } from 'react';
import styled from 'styled-components';

type RecordingViewProps = {
  chronometer: ReactNode;
};

export function RecordingView({ chronometer }: RecordingViewProps) {
  return (
    <Container>
      <ChronometerContainer>{chronometer}</ChronometerContainer>
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
