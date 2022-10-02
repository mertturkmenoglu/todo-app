import React, { ReactNode, useState } from 'react';
import { defaultTodoContextState as defaults, TodoContext } from './TodoContext';

export interface TodoContextProviderProps {
  children: ReactNode;
}

const TodoContextProvider: React.FC<TodoContextProviderProps> = ({ children }) => {
  const [isDeleteTodoOpen, setIsDeleteTodoOpen] = useState(defaults.isDeleteTodoOpen);
  const [deleteTodoId, setDeleteTodoId] = useState(defaults.deleteTodoId);

  return (
    <TodoContext.Provider
      value={{
        isDeleteTodoOpen,
        setIsDeleteTodoOpen,
        deleteTodoId,
        setDeleteTodoId,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
