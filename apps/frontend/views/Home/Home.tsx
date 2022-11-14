import { useContext } from 'react';
import { Slider } from '../../components/Slider/Slider';
import { HomeContext } from '../../contexts/home.context';
import {
  HomeActionType,
  RecorderStatus,
} from '../../contexts/reducers/home-context.reducer';
import { captureMicrophone } from '../../helpers/mic/capture-microphone.helper';
import { InitialView } from './InitialView';
import { RecordingView } from './RecordingView';

export function Home() {
  const { dispatchHomeEvent, homeState } = useContext(HomeContext);
  const { state } = homeState;

  async function startRecording() {
    const mic = homeState.mic ?? (await captureMicrophone());

    dispatchHomeEvent({ type: HomeActionType.INIT, mic });
  }

  async function stopRecording() {
    await homeState.recorder.stopRecording(() => {
      const mp3Blob = new Blob([homeState.recorder.getBlob()], {
        type: 'audio/mp3',
      });

      const blobUrl = URL.createObjectURL(mp3Blob);

      dispatchHomeEvent({
        type: HomeActionType.STOP_RECORDING,
        blobUrl,
      });
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
      {state === RecorderStatus.Stopped && <Slider src={homeState.blobUrl} />}
    </div>
  );
}
