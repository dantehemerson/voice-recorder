export enum RecorderStatus {
  Stopped = 'stopped',
  Recording = 'recording',
  Paused = 'paused',
  Recorded = 'recorded',
}

export type HomeState = {
  state: RecorderStatus;
};

export type HomeAction =
  | {
      type: HomeActionType.START_RECORDING;
    }
  | {
      type: HomeActionType.UPDATE_STATE;
      newState: RecorderStatus;
    };

export enum HomeActionType {
  START_RECORDING = 'START_RECORDING',
  UPDATE_STATE = 'UPDATE_STATE',
}

export function homeContextReducer(
  state: HomeState,
  action: HomeAction
): HomeState {
  switch (action.type) {
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
