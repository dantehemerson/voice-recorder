import React, { useReducer } from 'react';

export enum HomeScreen {
  INITIAL,
  RECORDING,
  PAUSED,
  PREVIEWING,
  ENCODING,
}

type HomeState = {
  screen: HomeScreen;
  audioBlobUrl: string;
};

enum HomeAction {
  CHANGE_SCREEN,
  RECORD_RESULT,
  START_NEW_RECORDING,
}

type HomeEvent =
  | {
      type: HomeAction.START_NEW_RECORDING;
    }
  | {
      type: HomeAction.CHANGE_SCREEN;
      newScreen: HomeScreen;
    }
  | {
      type: HomeAction.RECORD_RESULT;
      audioBlobUrl: string;
    };

type HomeContextValue = {
  homeState: HomeState;
  dispatchHomeEvent: React.Dispatch<HomeEvent>;
};

function homeContextReducer(state: HomeState, action: HomeEvent): HomeState {
  switch (action.type) {
    case HomeAction.CHANGE_SCREEN:
      return {
        ...state,
        screen: action.newScreen,
      };

    case HomeAction.START_NEW_RECORDING:
      return {
        ...state,
        screen: HomeScreen.INITIAL,
        audioBlobUrl: undefined,
      };

    case HomeAction.RECORD_RESULT:
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
    screen: HomeScreen.INITIAL,
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
        type: HomeAction.CHANGE_SCREEN,
        newScreen: HomeScreen.RECORDING,
      });
    },
    stopRecording: (data: Pick<HomeState, 'audioBlobUrl'>) => {
      context.dispatchHomeEvent({
        type: HomeAction.CHANGE_SCREEN,
        newScreen: HomeScreen.PREVIEWING,
      });
      context.dispatchHomeEvent({
        type: HomeAction.RECORD_RESULT,
        audioBlobUrl: data.audioBlobUrl,
      });
    },
    startNewRecording: () => {
      context.dispatchHomeEvent({
        type: HomeAction.START_NEW_RECORDING,
      });
    },
  };

  return { homeState: context.homeState, dispatch: actions };
}
