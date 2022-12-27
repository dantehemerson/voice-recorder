import { Button, Card } from '@components/atoms';
import { UploadResult } from '@components/organisms';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MediaInfo, Recording } from '@lib/recording';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

type SaveRecordingProps = {
  recording: Recording;
  onSaveRecording: (media: MediaInfo) => void;
  onDeleteMedia: () => void;
};

export function SaveRecording({ recording, ...props }: SaveRecordingProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [percentageComplete, setPercentageComplete] = useState(0);
  const [media, setMedia] = useState<MediaInfo>();

  useEffect(() => {
    recording.onSavePercent = percent => {
      setPercentageComplete(percent);
    };

    recording.onSaveError = error => {
      console.log('error saving', error);
      setIsSaving(false);
    };

    recording.onSaveSuccess = media => {
      setMedia(media);
      setIsSaving(false);
      props.onSaveRecording(media);
    };

    return () => {
      recording.onSavePercent = undefined;
      recording.onSaveError = undefined;
    };
  }, []);

  function handleSave() {
    setIsSaving(true);
    setPercentageComplete(0);
    recording.save();
  }

  if (!media) {
    return (
      <Wrapper>
        <Button
          onClick={handleSave}
          leftIcon={<FontAwesomeIcon icon={faCloudArrowUp} />}
        >
          {isSaving
            ? `Saving Recording...(${percentageComplete}%)`
            : 'Save recording'}
        </Button>
      </Wrapper>
    );
  }

  return (
    <UploadResult mediaId={media.mediaId} onClickDelete={props.onDeleteMedia} />
  );
}

const Wrapper = styled(Card)`
  margin-top: 20px;
  padding: 1.5rem 1.5rem;
  justify-content: center;
`;
