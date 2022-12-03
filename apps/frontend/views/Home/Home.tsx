import { useEffect } from 'react';
import { Chronometer } from '../../components/Chronometer/Chronometer';
import { HomeScreen, useHomeState } from '../../contexts/home.context';
import { useRecording } from '../../hooks/use-recording.hook';
import { useTimer } from '../../hooks/use-timer.hook';
import { Recorder } from '../../lib/recorder';
import { InitialView } from './InitialView';
import { RecordFinishedView } from './RecordFinishedView';
import { RecordingView } from './RecordingView';

export function Home() {
  const { homeState, dispatch } = useHomeState();
  const recorder = useRecording();
  const timer = useTimer();

  function initRecording() {
    console.log('starting app');
    recorder.clearRecording();
    recorder.initRecording();
    timer.reset();

    recorder.recording.onStart = () => {
      timer.resetAndStart();
    };

    recorder.recording.onStop = (sucess) => {
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

    recorder.recording.onError = (error) => {
      // TODO: Handle Error and show on the UI
      console.log('recorder errored', error);
      dispatch.startNewRecording();
    };

    console.log('recording started');
  }

  useEffect(() => {
    timer.reset();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function startRecording() {
    if (!Recorder.isRecordingSupported()) {
      console.log(`Recording is not supported in this browser`);
      return;
    }

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
      return <InitialView onClick={() => startRecording()} />;

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
        <RecordFinishedView
          blobUrl={homeState.audioBlobUrl}
          onClickNewRecording={handleClickNewRecording}
        />
      );

    default:
      throw new Error('Unknown state');
  }
}
