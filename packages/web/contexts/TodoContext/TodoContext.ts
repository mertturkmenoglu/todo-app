import React, { createContext } from 'react';

export interface TodoContextState {
  isDeleteTodoOpen: boolean;
  setIsDeleteTodoOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const defaultTodoContextState: TodoContextState = {
  isDeleteTodoOpen: false,
  setIsDeleteTodoOpen: () => {},
};

export const TodoContext = createContext<TodoContextState>(defaultTodoContextState);
