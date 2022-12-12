import { Button, Stack } from '@components/atoms';
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
      <Stack marginTop="30px">
        <Button onClick={props.onClickNewRecording}>
          Start a new recording
        </Button>
      </Stack>
    </RecordFinishedViewContainer>
  );
}

const RecordFinishedViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
`;
