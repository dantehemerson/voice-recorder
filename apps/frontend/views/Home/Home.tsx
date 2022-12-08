import { Chronometer } from '@components/atoms';
import { UploadResult } from '@components/organisms';
import { MediaInfo } from '@lib/recording/interfaces/media-info.interface';
import { errorStoreAtom } from '@lib/store/error.store';
import { useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { HomeScreen, useHomeState } from '../../contexts/home.context';
import { useRecording } from '../../hooks/use-recording.hook';
import { useTimer } from '../../hooks/use-timer.hook';
import { InitialView } from './InitialView';
import { RecordFinishedView } from './RecordFinishedView';
import { RecordingView } from './RecordingView';

export function Home() {
  const { homeState, dispatch } = useHomeState();
  const recorder = useRecording();
  const timer = useTimer();
  const [media, setMedia] = useState<MediaInfo>();

  const setError = useSetAtom(errorStoreAtom);

  function initRecording() {
    recorder.clearRecording();
    recorder.initRecording();

    timer.reset();

    recorder.recording.onStart = () => {
      timer.resetAndStart();
    };

    recorder.recording.onStop = sucess => {
      if (sucess) {
        dispatch.stopRecording({
          audioBlobUrl: recorder.recording.getAudioBlobUrl(),
        });
      } else {
        dispatch.startNewRecording();
      }
    };

    recorder.recording.onPause = () => {
      timer.stop();
    };

    recorder.recording.onResume = () => {
      timer.start();
    };

    recorder.recording.onSaveSuccess = () => {
      console.log('Sucesss');
      setMedia(recorder.recording.getMedia());
    };

    recorder.recording.onError = error => {
      // TODO: Handle Error and show on the UI
      console.log('recorder errored', error);
      setError({
        message: error.name,
        details: error.message,
      });
      dispatch.startNewRecording();
    };

    console.log('recording started');
  }

  useEffect(() => {
    timer.reset();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function startRecording() {
    dispatch.startRecording();
    initRecording();
    await recorder.recording.start();
  }

  async function handlePlayPause(pause: boolean) {
    if (pause) {
      await recorder.recording.pause();
    } else {
      await recorder.recording.resume();
    }
  }

  async function handleStop() {
    recorder.recording.stop();
    timer.stop();
  }

  async function handleClickNewRecording() {
    dispatch.startNewRecording();
  }

  switch (homeState.screen) {
    case HomeScreen.INITIAL:
      return (
        <>
          <InitialView onClick={() => startRecording()} />
          <button
            onClick={() =>
              setError({
                message: 'Error',
                details: 'Details ' + Math.random(),
              })
            }
          >
            Launch Error Random
          </button>

          <button onClick={() => setError(undefined)}>Clean Error Store</button>
        </>
      );

    case HomeScreen.RECORDING:
      return (
        <RecordingView
          chronometer={<Chronometer timer={timer} />}
          onClickPlayPause={handlePlayPause}
          onClickStop={handleStop}
        />
      );

    case HomeScreen.PREVIEWING:
      return (
        <>
          {!media ? (
            <RecordFinishedView
              blobUrl={homeState.audioBlobUrl || ''}
              recording={recorder.recording}
              onClickNewRecording={handleClickNewRecording}
            />
          ) : (
            <UploadResult url={homeState.audioBlobUrl || ''} />
          )}
        </>
      );

    default:
      throw new Error('Unknown state');
  }
}
