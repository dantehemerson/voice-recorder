import React, { useReducer } from 'react';
import {
  homeContextReducer,
  HomeState,
  HomeAction,
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
  children: React.ElementRef<any>;
};

function HomeContextProvider({ children }: HomeContextProviderProps) {
  const [homeState, dispatchHomeEvent] = useReducer(homeContextReducer, {
    state: RecorderStatus.Stopped,
  } as HomeState);

  const value: HomeContextValue = {
    homeState,
    dispatchHomeEvent,
  };

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
}

export { HomeContext, HomeContextProvider };
