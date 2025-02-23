import { errorParser } from '@lib/error-handler/error-parser';
import { MediaInfo, Recording } from '@lib/recording';
import { useSetAtom } from 'jotai';
import { useState } from 'react';
import { errorStoreAtom } from '~/store/error.store';

export function useHomePage() {
  // Holds the recording after it's done
  const [recordingResult, setRecordingResult] = useState<Recording>(undefined);
  const [deleteCount, setDeleteCount] = useState(0);
  // Holds error to show to the user.
  const setError = useSetAtom(errorStoreAtom);

  const onStartRecording = (toHome = false) => {
    toHome && window.history.pushState({}, '', '/');
    setRecordingResult(undefined);
    setError(undefined);
  };

  const onNewRecording = (recording: Recording) => {
    setRecordingResult(recording);
  };

  const onSaveRecording = (mediaInfo: MediaInfo) => {
    window.history.pushState({}, '', `/${mediaInfo.mediaId}`);
  };

  const onErrorRecording = (error: Error) => {
    const parsedError = errorParser(error);
    setError(undefined);

    setError(parsedError);
  };

  const onDeleteMedia = () => {
    window.history.pushState({}, '', '/');
    setRecordingResult(undefined);
    setError(undefined);
    setDeleteCount((prev) => prev + 1);
  };

  return {
    recording: recordingResult,
    deleteCount,
    onStartRecording,
    onNewRecording,
    onSaveRecording,
    onErrorRecording,
    onDeleteMedia,
  };
}
