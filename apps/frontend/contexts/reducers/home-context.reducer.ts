import { initRecorder } from '../../helpers/mic/init-recorder.helper';
import { RecordRTC } from '../../helpers/recordrtc';

export enum RecorderStatus {
  // Initial state, when load page
  Ready = 'ready',

  // The recorder is recording
  Recording = 'recording',

  // The recorder is paused
  Paused = 'paused',

  // The recording has finished
  Stopped = 'stopped',
}

export type HomeState = {
  state: RecorderStatus;
  recorder: RecordRTC;
  mic: MediaStream;
  blobUrl: string;
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
      type: HomeActionType.STOP_RECORDING;
      blobUrl: string;
    }
  | {
      type: HomeActionType.UPDATE_STATE;
      newState: RecorderStatus;
    };

export enum HomeActionType {
  INIT = 'INIT',
  START_RECORDING = 'START_RECORDING',
  UPDATE_STATE = 'UPDATE_STATE',
  STOP_RECORDING = 'STOP_RECORDING',
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

        recorder.startRecording();

        return {
          ...state,
          state: RecorderStatus.Recording,
          mic: state.mic ?? action.mic,
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

    case HomeActionType.STOP_RECORDING:
      return {
        ...state,
        state: RecorderStatus.Stopped,
        blobUrl: action.blobUrl,
      };

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
