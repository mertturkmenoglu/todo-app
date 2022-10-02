import React, { useContext } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';
import { HomeContext } from '../../contexts';

function HomeTitle(): JSX.Element {
  const ctx = useContext(HomeContext);

  return (
    <div className="ml-2 flex items-center justify-between">
      <h2 className="ml-2 text-5xl font-bold">My Todos</h2>
      <button
        className="ml-4 flex items-center bg-amber-300 py-2 px-8"
        onClick={() => ctx.setIsNewTodoOpen(true)}
      >
        <PlusIcon className="h-5 w-5 text-black" />
        <span className="ml-2">New Todo</span>
      </button>
    </div>
  );
}

export default HomeTitle;
