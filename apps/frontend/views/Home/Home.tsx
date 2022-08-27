import { useContext, useEffect } from 'react';
import { PlayPauseButton } from '../../components/PlayPauseButton/PlayPauseButton';
import { RecordButton } from '../../components/RecordButton/RecordButton';
import { Timer } from '../../components/Timer/Timer';
import { HomeContext } from '../../contexts/home.context';
import {
  HomeActionType,
  RecorderStatus,
} from '../../contexts/reducers/home-context.reducer';
import { captureMicrophone } from '../../helpers/mic/capture-microphone.helper';

export function Home() {
  const { dispatchHomeEvent, homeState } = useContext(HomeContext);

  useEffect(() => {
    async function initRecorder() {
      const mic = await captureMicrophone();

      dispatchHomeEvent({ type: HomeActionType.INIT, mic });
    }

    initRecorder();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { state } = homeState;

  return (
    <div>
      <Timer mm={10} ss={11} hideMs={true} />
      <PlayPauseButton
        onClick={(newState) =>
          dispatchHomeEvent({ type: HomeActionType.UPDATE_STATE, newState })
        }
        paused={state === RecorderStatus.Paused}
      />
      <RecordButton
        onClick={(newState) =>
          dispatchHomeEvent({ type: HomeActionType.UPDATE_STATE, newState })
        }
        recording={
          state === RecorderStatus.Recording || state === RecorderStatus.Paused
        }
      />
    </div>
  );
}
