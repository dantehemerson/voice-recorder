import { Button, Card } from '@components/atoms';
import { UploadResult } from '@components/organisms';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MediaInfo, Recording } from '@lib/recording';
import { deleteRecording } from '@lib/services/recording.service';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

type SaveRecordingProps = {
  recordingResult: Recording;
  onSaveRecording: (media: MediaInfo) => void;
  onDeleteMedia: () => void;
};

export function SaveRecording({
  recordingResult,
  ...props
}: SaveRecordingProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [percentageComplete, setPercentageComplete] = useState(0);
  const [media, setMedia] = useState<MediaInfo>();

  useEffect(() => {
    recordingResult.onSavePercent = (percent) => {
      setPercentageComplete(percent);
    };

    recordingResult.onSaveError = (error) => {
      console.log('error saving', error);
      setIsSaving(false);
    };

    recordingResult.onSaveSuccess = (media) => {
      setMedia(media);
      setIsSaving(false);
      props.onSaveRecording(media);
    };

    return () => {
      recordingResult.onSavePercent = undefined;
      recordingResult.onSaveError = undefined;
    };
  }, []);

  function handleSave() {
    setIsSaving(true);
    setPercentageComplete(0);
    recordingResult.save();
  }

  async function handleDeleteMedia() {
    try {
      await deleteRecording(media.mediaId);
    } catch (error) {
      console.error('Error deleting recording', error);
    }

    props.onDeleteMedia();
  }

  if (!media) {
    return (
      <Wrapper>
        <Button
          onClick={handleSave}
          leftIcon={<FontAwesomeIcon icon={faCloudArrowUp} />}
        >
          {isSaving
            ? `Saving Recording...(${percentageComplete} %)`
            : 'Save recording'}
        </Button>
      </Wrapper>
    );
  }

  return (
    <UploadResult mediaId={media.mediaId} onClickDelete={handleDeleteMedia} />
  );
}

const Wrapper = styled(Card)`
  margin-top: 20px;
  padding: 1.5rem 1.5rem;
  justify-content: center;
`;
