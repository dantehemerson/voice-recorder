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
  const recording = useRecording();
  const timer = useTimer();

  useEffect(() => {
    timer.reset();

    recording.onStart = () => {
      timer.resetAndStart();
      dispatch.startRecording();
    };

    recording.onError = (error) => {
      // TODO: Handle Error and show on the UI
      console.log('recorder errored', error);
    };

    recording.onStop = () => {
      timer.stop();
      dispatch.stopRecording({
        audioBlobUrl: recording.getAudioBlobUrl(),
      });
    };

    recording.onPause = () => {
      timer.stop();
    };

    recording.onResume = () => {
      timer.start();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function startRecording() {
    if (!Recorder.isRecordingSupported()) {
      console.log(`Recording is not supported in this browser`);
      return;
    }

    await recording.start();
  }

  async function handlePlayPause(pause: boolean) {
    if (pause) {
      await recording.pause();
    } else {
      await recording.resume();
    }
  }

  async function handleStop() {
    recording.stop();
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
