import { errorStoreAtom } from '@features/HomePage/Error.component';
import { errorParser } from '@lib/error-handler/error-parser';
import { MediaInfo, Recording } from '@lib/recording';
import { useSetAtom } from 'jotai';
import { useState } from 'react';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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

  const onErrorRecording = async (error: Error) => {
    const parsedError = errorParser(error);
    setError(undefined);
    // Delay to show a blink when error occurs in short period of time
    await sleep(20);
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
