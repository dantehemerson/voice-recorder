import React, { useReducer } from 'react';

export enum HomeViewState {
  Ready = 'ready',
  Recording = 'recording',
  Stopped = 'stopped',
}

type HomeState = {
  state: HomeViewState;
  audioBlobUrl: string;
};

type HomeAction =
  | {
      type: HomeActionType.START_NEW_RECORDING;
    }
  | {
      type: HomeActionType.UPDATE_STATE;
      newState: HomeViewState;
    }
  | {
      type: HomeActionType.RECORD_RESULT;
      audioBlobUrl: string;
    };

enum HomeActionType {
  UPDATE_STATE = 'UPDATE_STATE',
  RECORD_RESULT = 'RECORD_RESULT',
  START_NEW_RECORDING = 'START_NEW_RECORDING',
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

    case HomeActionType.START_NEW_RECORDING:
      return {
        ...state,
        state: HomeViewState.Ready,
        audioBlobUrl: undefined,
      };

    case HomeActionType.RECORD_RESULT:
      return {
        ...state,
        audioBlobUrl: action.audioBlobUrl,
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
    state: HomeViewState.Ready,
    audioBlobUrl: undefined,
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
        newState: HomeViewState.Recording,
      });
    },
    stopRecording: (data: Pick<HomeState, 'audioBlobUrl'>) => {
      context.dispatchHomeEvent({
        type: HomeActionType.UPDATE_STATE,
        newState: HomeViewState.Stopped,
      });
      context.dispatchHomeEvent({
        type: HomeActionType.RECORD_RESULT,
        audioBlobUrl: data.audioBlobUrl,
      });
    },
    startNewRecording: () => {
      context.dispatchHomeEvent({
        type: HomeActionType.START_NEW_RECORDING,
      });
    },
  };

  return { homeState: context.homeState, dispatch: actions };
}
