import { useContext } from 'react';
import { Slider } from '../../components/Slider/Slider';
import { StopButton } from '../../components/StopButton/StopButton';
import { Timer } from '../../components/Timer/Timer';
import { HomeContext } from '../../contexts/home.context';
import {
  HomeActionType,
  RecorderStatus,
} from '../../contexts/reducers/home-context.reducer';
import { captureMicrophone } from '../../helpers/mic/capture-microphone.helper';
import { InitialView } from './InitialView';

export function Home() {
  const { dispatchHomeEvent, homeState } = useContext(HomeContext);
  const { state } = homeState;

  const isRecording =
    state === RecorderStatus.Recording || state === RecorderStatus.Paused;

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

  return (
    <div>
      <Timer mm={10} ss={11} hideMs={true} />
      {!isRecording && <InitialView onClick={() => startRecording()} />}
      {isRecording && <StopButton onClick={() => stopRecording()} />}
      {state === RecorderStatus.Stopped && <Slider src={homeState.blobUrl} />}
    </div>
  );
}
