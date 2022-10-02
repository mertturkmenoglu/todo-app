import React, { ReactNode, useState } from 'react';
import { defaultHomeContextState as defaults, HomeContext } from './HomeContext';

export interface HomeContextProviderProps {
  children: ReactNode;
}

const HomeContextProvider: React.FC<HomeContextProviderProps> = ({ children }) => {
  const [isNewTodoOpen, setIsNewTodoOpen] = useState(defaults.isNewTodoOpen);
  const [isDeleteTodoOpen, setIsDeleteTodoOpen] = useState(defaults.isDeleteTodoOpen);
  const [deleteTodoId, setDeleteTodoId] = useState(defaults.deleteTodoId);
  const [searchTerm, setSearchTerm] = useState(defaults.searchTerm);
  const [isOnlyIncomplete, setIsOnlyIncomplete] = useState(defaults.isOnlyIncomplete);
  const [paginationIndex, setPaginationIndex] = useState(defaults.paginationIndex);

  return (
    <HomeContext.Provider
      value={{
        isNewTodoOpen,
        setIsNewTodoOpen,
        isDeleteTodoOpen,
        setIsDeleteTodoOpen,
        deleteTodoId,
        setDeleteTodoId,
        searchTerm,
        setSearchTerm,
        isOnlyIncomplete,
        setIsOnlyIncomplete,
        paginationIndex,
        setPaginationIndex,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export default HomeContextProvider;
