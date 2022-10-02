import React, { ReactNode, useState } from 'react';
import { defaultTodoContextState as defaults, TodoContext } from './TodoContext';

export interface TodoContextProviderProps {
  children: ReactNode;
}

const TodoContextProvider: React.FC<TodoContextProviderProps> = ({ children }) => {
  const [isDeleteTodoOpen, setIsDeleteTodoOpen] = useState(defaults.isDeleteTodoOpen);

  return (
    <TodoContext.Provider
      value={{
        isDeleteTodoOpen,
        setIsDeleteTodoOpen,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
