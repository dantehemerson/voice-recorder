import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Slider } from '../../components/Slider/Slider.components';
import { Recording } from '../../lib/recording';

type RecordFinishedViewProps = {
  blobUrl: string;
  recording: Recording;
  onClickNewRecording: () => void;
};

export function RecordFinishedView({
  recording,
  ...props
}: RecordFinishedViewProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [percentageComplete, setPercentageComplete] = useState(0);

  useEffect(() => {
    recording.onSavePercent = percent => {
      setPercentageComplete(percent);
    };

    recording.onSaveError = error => {
      console.log('error saving', error);
      setIsSaving(false);
    };

    return () => {
      recording.onSavePercent = null;
      recording.onSaveSuccess = null;
      recording.onSaveError = null;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSaveRecording() {
    setIsSaving(true);
    setPercentageComplete(0);
    recording.save();
  }

  return (
    <RecordFinishedViewContainer>
      <Slider src={props.blobUrl} />
      <NewRecordingButton onClick={props.onClickNewRecording}>
        Start a new recording
      </NewRecordingButton>
      <NewRecordingButton onClick={handleSaveRecording} disabled={isSaving}>
        {isSaving
          ? `Saving Recording...(${percentageComplete}%)`
          : 'Save recording'}
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
