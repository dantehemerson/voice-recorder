import { MediaInfo, Recording } from '@lib/recording';
import { useState } from 'react';

export function useHomePage() {
  const [recording, setRecording] = useState<Recording>(undefined);

  const onStartRecording = (toHome = false) => {
    toHome && window.history.pushState({}, '', '/');
    setRecording(undefined);
  };

  const onNewRecording = (recording: Recording) => {
    setRecording(recording);
  };

  const onSaveRecording = (mediaInfo: MediaInfo) => {
    window.history.pushState({}, '', `/${mediaInfo.mediaId}`);
  };

  const onDeleteMedia = () => {
    window.history.pushState({}, '', '/');
    setRecording(undefined);
  };

  return {
    recording,
    onStartRecording,
    onNewRecording,
    onSaveRecording,
    onDeleteMedia,
  };
}
