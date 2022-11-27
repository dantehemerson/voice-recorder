import { useContext, useEffect } from 'react';
import { HomeContext } from '../../contexts/home.context';
import {
  HomeActionType,
  RecorderStatus,
} from '../../contexts/reducers/home-context.reducer';
import { useRecorder } from '../../hooks/use-recorder.hook';
import { InitialView } from './InitialView';
import { RecordFinishedView } from './RecordFinishedView';
import { RecordingView } from './RecordingView';

export function Home() {
  const { dispatchHomeEvent, homeState } = useContext(HomeContext);
  const recorder = useRecorder();
  const { state } = homeState;

  useEffect(() => {
    recorder.onDataAvailable = (blob) => {
      console.log('blob', blob);
    };

    recorder.onStart = () => {
      console.log('recorder started');
    };

    recorder.onError = (error) => {
      console.log('recorder errored', error);
    };

    recorder.onStop = () => {
      console.log('recorder stopped');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function startRecording() {
    recorder.start();
  }

  async function stopRecording() {
    console.log('Stopped');
  }

  async function handleClickNewRecording() {
    dispatchHomeEvent({
      type: HomeActionType.START_NEW_RECORDING,
    });
  }

  const isRecording =
    state === RecorderStatus.Recording || state === RecorderStatus.Paused;

  return (
    <div>
      {state === RecorderStatus.Ready && (
        <InitialView onClick={() => startRecording()} />
      )}
      {isRecording && <RecordingView onClick={() => stopRecording()} />}
      {state === RecorderStatus.Stopped && (
        <RecordFinishedView
          blobUrl={homeState.blobUrl}
          onClickNewRecording={handleClickNewRecording}
        />
      )}
    </div>
  );
}
