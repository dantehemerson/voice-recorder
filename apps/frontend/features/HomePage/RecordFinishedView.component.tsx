import { Slider } from '@components/atoms';
import styled from 'styled-components';

type RecordFinishedViewProps = {
  blobUrl: string;
  onClickNewRecording: () => void;
};

export function RecordFinishedView(props: RecordFinishedViewProps) {
  return (
    <RecordFinishedViewContainer>
      <Slider src={props.blobUrl} />
      <NewRecordingButton onClick={props.onClickNewRecording}>
        Start a new recording
      </NewRecordingButton>
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

const NewRecordingButton = styled.button`
  background: #2872d2;
  cursor: pointer;
  color: white;
  opacity: ${props => (props.disabled ? 0.8 : 1)};
  margin-top: 24px;
  padding: 6px 16px;
  border-radius: 30px;
  box-shadow: 0px 0px 3px 0px #525252;
  transition: all 0.3s ease-in-out;
  &:hover {
    background: #1e5eb8;
  }
`;
