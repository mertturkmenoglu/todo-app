import React, { ReactNode, useState } from 'react';
import { defaultHomeContextState as defaults, HomeContext } from './HomeContext';

export interface HomeContextProviderProps {
  children: ReactNode;
}

const HomeContextProvider: React.FC<HomeContextProviderProps> = ({ children }) => {
  const [isNewTodoOpen, setIsNewTodoOpen] = useState(defaults.isNewTodoOpen);

  return (
    <HomeContext.Provider
      value={{
        isNewTodoOpen,
        setIsNewTodoOpen,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export default HomeContextProvider;
