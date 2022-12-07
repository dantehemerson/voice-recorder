import React from 'react';
import { useState } from 'react';

export function useErrorStore() {
  const errorStore = React.useContext(ErrorStoreContext);

  if (!errorStore) {
    throw new Error('useErrorStore must be used within an ErrorStoreProvider');
  }

  return errorStore;
}

export function ErrorStoreProvider({ children }) {
  const [error, setError] = useState<ErrorStore>(undefined);

  const errorStore: ErrorStoreContextValue = {
    setError,
    error,
    cleanErrorStore: () => setError(undefined),
  };

  return (
    <ErrorStoreContext.Provider value={errorStore}>
      {children}
    </ErrorStoreContext.Provider>
  );
}

export type ErrorStore = {
  message: string;
  details: string;
};

type ErrorStoreContextValue = {
  error: ErrorStore;
  setError: React.Dispatch<React.SetStateAction<ErrorStore>>;
  cleanErrorStore: () => void;
};

const ErrorStoreContext =
  React.createContext<ErrorStoreContextValue>(undefined);
