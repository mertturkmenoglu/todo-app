import React, { createContext } from 'react';

export interface HomeContextState {
  isNewTodoOpen: boolean;
  setIsNewTodoOpen: React.Dispatch<React.SetStateAction<boolean>>;

  isDeleteTodoOpen: boolean;
  setIsDeleteTodoOpen: React.Dispatch<React.SetStateAction<boolean>>;

  deleteTodoId: number | null;
  setDeleteTodoId: React.Dispatch<React.SetStateAction<number | null>>;
}

export const defaultHomeContextState: HomeContextState = {
  isNewTodoOpen: false,
  setIsNewTodoOpen: () => {},
  isDeleteTodoOpen: false,
  setIsDeleteTodoOpen: () => {},
  deleteTodoId: null,
  setDeleteTodoId: () => {},
};

export const HomeContext = createContext<HomeContextState>(defaultHomeContextState);
