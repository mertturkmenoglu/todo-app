import React, { createContext } from 'react';

export interface HomeContextState {
  isNewTodoOpen: boolean;
  setIsNewTodoOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const defaultHomeContextState: HomeContextState = {
  isNewTodoOpen: false,
  setIsNewTodoOpen: () => {},
};

export const HomeContext = createContext<HomeContextState>(defaultHomeContextState);
