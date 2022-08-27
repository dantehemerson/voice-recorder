import { initRecorder } from '../../helpers/mic/init-recorder.helper';
import { RecordRTC } from '../../helpers/recordrtc';

export enum RecorderStatus {
  Stopped = 'stopped',
  Recording = 'recording',
  Paused = 'paused',
  Recorded = 'recorded',
}

export type HomeState = {
  state: RecorderStatus;
  recorder: RecordRTC;
};

export type HomeAction =
  | {
      type: HomeActionType.INIT;
      mic: MediaStream;
    }
  | {
      type: HomeActionType.START_RECORDING;
    }
  | {
      type: HomeActionType.UPDATE_STATE;
      newState: RecorderStatus;
    };

export enum HomeActionType {
  INIT = 'INIT',
  START_RECORDING = 'START_RECORDING',
  UPDATE_STATE = 'UPDATE_STATE',
}

export function homeContextReducer(
  state: HomeState,
  action: HomeAction
): HomeState {
  switch (action.type) {
    case HomeActionType.INIT:
      try {
        let recorder;

        if (state.recorder) {
          recorder = state.recorder;
          recorder.reset();
        } else {
          recorder = initRecorder({ mic: action.mic });
        }

        return {
          ...state,
          recorder,
        };
      } catch (error) {
        alert(
          'An error occured while initializing the recorder, check console'
        );
        console.error(error);
        return state;
      }
      break;
    case HomeActionType.START_RECORDING:
      return {
        ...state,
        state: RecorderStatus.Recording,
      };
    case HomeActionType.UPDATE_STATE:
      return {
        ...state,
        state: action.newState,
      };
    default:
      return state;
  }
}
