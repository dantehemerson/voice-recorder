import { useContext } from 'react';
import { PlayPauseButton } from '../../components/PlayPauseButton/PlayPauseButton';
import { RecordButton } from '../../components/RecordButton/RecordButton';
import { Timer } from '../../components/Timer/Timer';
import { HomeContext } from '../../contexts/home.context';
import {
  HomeActionType,
  RecorderStatus,
} from '../../contexts/reducers/home-context.reducer';
import { captureMicrophone } from '../../helpers/mic/capture-microphone.helper';
import { Slider } from '../../components/Slider/Slider';

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

  return (
    <div>
      <Timer mm={10} ss={11} hideMs={true} />
      <PlayPauseButton
        onClick={(newState) =>
          dispatchHomeEvent({ type: HomeActionType.UPDATE_STATE, newState })
        }
        paused={state === RecorderStatus.Paused}
      />

      {state === RecorderStatus.Stopped && <Slider src={homeState.blobUrl} />}
      <RecordButton
        onClick={(newState) => {
          if (newState === RecorderStatus.Recording) {
            startRecording();
          } else {
            stopRecording();
          }
        }}
        recording={
          state === RecorderStatus.Recording || state === RecorderStatus.Paused
        }
      />
    </div>
  );
}
