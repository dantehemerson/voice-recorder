import { useEffect } from 'react';
import { RecorderStatus, useHomeState } from '../../contexts/home.context';
import { useRecorder } from '../../hooks/use-recorder.hook';
import { useRecordingStore } from '../../hooks/use-recording-store.hook';
import { InitialView } from './InitialView';
import { RecordFinishedView } from './RecordFinishedView';
import { RecordingView } from './RecordingView';

export function Home() {
  const { homeState, dispatch } = useHomeState();

  const recorder = useRecorder();
  const recordingStore = useRecordingStore();

  const { state } = homeState;

  useEffect(() => {
    recorder.onDataAvailable = (blob) => {
      recordingStore.appendData(blob);
    };

    recorder.onStart = () => {
      console.log('recorder started');
    };

    recorder.onError = (error) => {
      console.log('recorder errored', error);
    };

    recorder.onStop = () => {
      dispatch.stopRecording({
        audioBlobUrl: recordingStore.generateAudioBlobUrl(),
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function startRecording() {
    await recorder.start();
    dispatch.startRecording();
  }

  async function stopRecording() {
    recorder.stop();
  }

  async function handleClickNewRecording() {
    dispatch.startNewRecording();
  }

  const isRecording =
    state === RecorderStatus.Recording || state === RecorderStatus.Paused;

  switch(state) {
    case RecorderStatus.Ready:
return  <InitialView onClick={() => startRecording()} />
  }
  return (
    <div>
      {state === RecorderStatus.Ready && (

      )}
      {isRecording && <RecordingView onClick={() => stopRecording()} />}
      {state === RecorderStatus.Stopped && (
        <RecordFinishedView
          blobUrl={homeState.audioBlobUrl}
          onClickNewRecording={handleClickNewRecording}
        />
      )}
    </div>
  );
}
