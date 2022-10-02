import React, { ReactNode, useState } from 'react';
import { defaultHomeContextState as defaults, HomeContext } from './HomeContext';

export interface HomeContextProviderProps {
  children: ReactNode;
}

const HomeContextProvider: React.FC<HomeContextProviderProps> = ({ children }) => {
  const [isNewTodoOpen, setIsNewTodoOpen] = useState(defaults.isNewTodoOpen);
  const [isDeleteTodoOpen, setIsDeleteTodoOpen] = useState(defaults.isDeleteTodoOpen);
  const [deleteTodoId, setDeleteTodoId] = useState(defaults.deleteTodoId);

  return (
    <HomeContext.Provider
      value={{
        isNewTodoOpen,
        setIsNewTodoOpen,
        isDeleteTodoOpen,
        setIsDeleteTodoOpen,
        deleteTodoId,
        setDeleteTodoId,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export default HomeContextProvider;
