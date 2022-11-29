import React, { useReducer } from 'react';

export enum RecorderStatus {
  Ready = 'ready',
  Recording = 'recording',
  Paused = 'paused',
  Stopped = 'stopped',
}

type HomeState = {
  state: RecorderStatus;
  audioBlob: string;
  audioBlobUrl: string;
};

type HomeAction = {
  type: HomeActionType.UPDATE_STATE;
  newState: RecorderStatus;
};

enum HomeActionType {
  UPDATE_STATE = 'UPDATE_STATE',
}

type HomeContextValue = {
  homeState: HomeState;
  dispatchHomeEvent: React.Dispatch<HomeAction>;
};

function homeContextReducer(state: HomeState, action: HomeAction): HomeState {
  switch (action.type) {
    case HomeActionType.UPDATE_STATE:
      return {
        ...state,
        state: action.newState,
      };
    default:
      return state;
  }
}

const HomeContext = React.createContext<HomeContextValue | undefined>(
  undefined
);

export function HomeContextProvider({ children }) {
  const [homeState, dispatchHomeEvent] = useReducer(homeContextReducer, {
    state: RecorderStatus.Ready,
    audioBlobUrl: undefined,
    audioBlob: undefined,
  });

  const value: HomeContextValue = {
    homeState,
    dispatchHomeEvent,
  };

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
}

export function useHomeState() {
  const context = React.useContext(HomeContext);

  if (context === undefined) {
    throw new Error('useHomeState must be used within a HomeContextProvider');
  }

  const actions = {
    startRecording: () => {
      context.dispatchHomeEvent({
        type: HomeActionType.UPDATE_STATE,
        newState: RecorderStatus.Recording,
      });
    },
    pauseRecording: () => {
      context.dispatchHomeEvent({
        type: HomeActionType.UPDATE_STATE,
        newState: RecorderStatus.Paused,
      });
    },
    resumeRecording: () => {
      context.dispatchHomeEvent({
        type: HomeActionType.UPDATE_STATE,
        newState: RecorderStatus.Recording,
      });
    },
    stopRecording: () => {
      context.dispatchHomeEvent({
        type: HomeActionType.UPDATE_STATE,
        newState: RecorderStatus.Stopped,
      });
    },
    startNewRecording: () => {
      context.dispatchHomeEvent({
        type: HomeActionType.UPDATE_STATE,
        newState: RecorderStatus.Ready,
      });
    },
  };

  return { homeState: context.homeState, dispatch: actions };
}
