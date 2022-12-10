import { Button } from '@components/atoms';
import { AudioPlayer } from '@components/organisms';
import styled from 'styled-components';

type RecordFinishedViewProps = {
  blobUrl: string;
  onClickNewRecording: () => void;
};

export function RecordFinishedView(props: RecordFinishedViewProps) {
  return (
    <RecordFinishedViewContainer>
      <AudioPlayer src={'/Feid%20-%20Vacaxiones.mp3'} />
      <Button onClick={props.onClickNewRecording}>Start a new recording</Button>
    </RecordFinishedViewContainer>
  );
}

const RecordFinishedViewContainer = styled.div`
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
