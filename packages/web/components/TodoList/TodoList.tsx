import React, { useRef } from 'react';
import { TodoApi } from '../../services';
import { useQuery } from '@tanstack/react-query';
import { isApiError } from '../../services/common/isApiError';
import TodoItem from './TodoItem';

export interface TodoListProps {
  searchTerm: string;
  setDeleteItemId: React.Dispatch<React.SetStateAction<number | null>>;
  setIsDeleteTodoOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function TodoList({ searchTerm, setDeleteItemId, setIsDeleteTodoOpen }: TodoListProps): JSX.Element {
  const todoApi = useRef(new TodoApi());

  const { data, isLoading, isError } = useQuery(['todos'], async () => {
    const result = await todoApi.current.getTodos();

    if (isApiError(result)) {
      throw Error(result.message);
    }

    return result.data;
  });

  if (isError) {
    return <div>Something went wrong.</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Something went wrong.</div>;
  }

  return (
    <>
      <ul className="w-full space-y-4">
        {data.data.map((todo) => (
          <li
            key={todo.id}
            className="flex w-full items-center justify-between px-4 py-2 hover:bg-amber-50"
          >
            <TodoItem
              todo={todo}
              setDeleteItemId={setDeleteItemId}
              setIsDeleteTodoOpen={setIsDeleteTodoOpen}
            />
          </li>
        ))}
      </ul>

      {data.data.length === 0 && searchTerm !== '' && <div className="text-center">No search results</div>}

      {data.data.length === 0 && searchTerm === '' && (
        <div className="text-center">No todos. Try adding a new one.</div>
      )}
    </>
  );
}

export default TodoList;
