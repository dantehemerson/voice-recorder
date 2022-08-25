import { Timer } from '../../components/Timer/Timer';
import React, { useContext } from 'react';
import { PlayPauseButton } from '../../components/PlayPauseButton/PlayPauseButton';
import { RecordButton } from '../../components/RecordButton/RecordButton';
import { HomeContext } from '../../contexts/home.context';
import {
  HomeActionType,
  RecorderStatus,
} from '../../contexts/reducers/home-context.reducer';

export function Home() {
  const { dispatchHomeEvent, homeState } = useContext(HomeContext);
  console.log('🤫 Dante ➤ Home ➤ homeState', homeState);

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
