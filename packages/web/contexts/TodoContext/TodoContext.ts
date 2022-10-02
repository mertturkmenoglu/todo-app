import React, { createContext } from 'react';

export interface TodoContextState {
  isDeleteTodoOpen: boolean;
  setIsDeleteTodoOpen: React.Dispatch<React.SetStateAction<boolean>>;

  deleteTodoId: number | null;
  setDeleteTodoId: React.Dispatch<React.SetStateAction<number | null>>;
}

export const defaultTodoContextState: TodoContextState = {
  isDeleteTodoOpen: false,
  setIsDeleteTodoOpen: () => {},
  deleteTodoId: null,
  setDeleteTodoId: () => {},
};

export const TodoContext = createContext<TodoContextState>(defaultTodoContextState);
