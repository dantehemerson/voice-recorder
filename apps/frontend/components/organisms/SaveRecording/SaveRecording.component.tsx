import { Button } from '@components/atoms';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Recording } from '@lib/recording/recording';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

type SaveRecordingProps = {
  recording: Recording;
};

export function SaveRecording({ recording }: SaveRecordingProps) {
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
      recording.onSavePercent = undefined;
      recording.onSaveError = undefined;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSave() {
    setIsSaving(true);
    setPercentageComplete(0);
    recording.save();
  }

  return (
    <Wrapper>
      <Button onClick={handleSave} leftIcon={<FontAwesomeIcon icon={faSave} />}>
        {isSaving
          ? `Saving Recording...(${percentageComplete}%)`
          : 'Save recording'}
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div``;
