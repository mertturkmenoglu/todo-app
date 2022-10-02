import React, { useContext } from 'react';
import TodoItem from './TodoItem';
import { Pagination } from '../Pagination';
import { HomeContext } from '../../contexts';
import { useTodoList } from './useTodoList.hook';

function TodoList(): JSX.Element {
  const ctx = useContext(HomeContext);

  const { data, isLoading, isError } = useTodoList();

  if (isError) {
    return <div>Something went wrong.</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Something went wrong.</div>;
  }

  if (data.data.length === 0 && ctx.searchTerm !== '') {
    return <div className="text-center">No search results</div>;
  }

  if (data.data.length === 0 && ctx.searchTerm === '') {
    return <div className="text-center">No todos. Try adding a new one.</div>;
  }

  return (
    <>
      <ul className="w-full space-y-4">
        {data.data.map((todo) => (
          <li
            key={todo.id}
            className="flex w-full items-center justify-between px-4 py-2 hover:bg-amber-50"
          >
            <TodoItem todo={todo} />
          </li>
        ))}
      </ul>

      {data.data.length !== 0 && (
        <div className="mt-8 flex w-full justify-center">
          <Pagination
            currentPage={ctx.paginationIndex}
            totalPages={data.pagination.totalPages}
            onItemClick={(index) => ctx.setPaginationIndex(index)}
            onPrevClick={() => ctx.setPaginationIndex((prev) => prev - 1)}
            onNextClick={() => ctx.setPaginationIndex((prev) => prev + 1)}
          />
        </div>
      )}
    </>
  );
}

export default TodoList;
