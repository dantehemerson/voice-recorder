import React, { useReducer } from 'react';
import {
  HomeAction,
  homeContextReducer,
  HomeState,
  RecorderStatus,
} from './reducers/home-context.reducer';

type HomeContextValue = {
  homeState: HomeState;
  dispatchHomeEvent: React.Dispatch<HomeAction>;
};

const HomeContext = React.createContext<HomeContextValue | undefined>(
  undefined
);

type HomeContextProviderProps = {
  children: JSX.Element;
};

function HomeContextProvider({ children }: HomeContextProviderProps) {
  const [homeState, dispatchHomeEvent] = useReducer(homeContextReducer, {
    state: RecorderStatus.Stopped,
    recorder: undefined,
  });

  const value: HomeContextValue = {
    homeState,
    dispatchHomeEvent,
  };

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
}

export { HomeContext, HomeContextProvider };
