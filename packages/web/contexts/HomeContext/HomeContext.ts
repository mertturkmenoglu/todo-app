import React, { createContext } from 'react';

export interface HomeContextState {
  isNewTodoOpen: boolean;
  setIsNewTodoOpen: React.Dispatch<React.SetStateAction<boolean>>;

  isDeleteTodoOpen: boolean;
  setIsDeleteTodoOpen: React.Dispatch<React.SetStateAction<boolean>>;

  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;

  isOnlyIncomplete: boolean;
  setIsOnlyIncomplete: React.Dispatch<React.SetStateAction<boolean>>;

  paginationIndex: number;
  setPaginationIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const defaultHomeContextState: HomeContextState = {
  isNewTodoOpen: false,
  setIsNewTodoOpen: () => {},
  isDeleteTodoOpen: false,
  setIsDeleteTodoOpen: () => {},
  searchTerm: '',
  setSearchTerm: () => {},
  isOnlyIncomplete: false,
  setIsOnlyIncomplete: () => {},
  paginationIndex: 1,
  setPaginationIndex: () => {},
};

export const HomeContext = createContext<HomeContextState>(defaultHomeContextState);
