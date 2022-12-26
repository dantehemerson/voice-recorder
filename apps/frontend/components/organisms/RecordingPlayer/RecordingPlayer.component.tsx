import { Button, Card, Stack } from '@components/atoms';
import { AudioPlayer } from '@components/organisms';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

type RecordFinishedViewProps = {
  url: string;
  onClickNewRecording: () => void;
};

export function RecordingPlayer(props: RecordFinishedViewProps) {
  return (
    <RecordFinishedViewContainer>
      <AudioPlayer src={props.url} />
      <Stack marginTop="30px">
        <Button
          onClick={props.onClickNewRecording}
          leftIcon={<FontAwesomeIcon icon={faRotateRight} />}
        >
          Start a new recording
        </Button>
      </Stack>
    </RecordFinishedViewContainer>
  );
}

const RecordFinishedViewContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;
`;
