import React, { useContext, useEffect, useRef } from 'react';
import { TodoApi } from '../../services';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { isApiError } from '../../services/common/isApiError';
import TodoItem from './TodoItem';
import { HomeContext } from '../../contexts';
import { Pagination } from '../Pagination';
import { TodoQueryParams } from '../../services/common/types/TodoQueryParams';

function TodoList(): JSX.Element {
  const ctx = useContext(HomeContext);
  const queryClient = useQueryClient();

  const todoApi = useRef(new TodoApi());

  const { data, isLoading, isError } = useQuery(
    ['todos', ctx.paginationIndex],
    async () => {
      const query: Partial<TodoQueryParams> = {
        page: ctx.paginationIndex,
        order: 'desc',
        completed: ctx.isOnlyIncomplete ? ctx.isOnlyIncomplete : undefined,
        pageSize: 5,
        searchTerm: ctx.searchTerm !== '' ? ctx.searchTerm : undefined,
      };

      if (!ctx.isOnlyIncomplete) {
        delete query.completed;
      }

      const result = await todoApi.current.getTodos(query);

      if (isApiError(result)) {
        throw Error(result.message);
      }

      return result.data;
    },
    {
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    queryClient.invalidateQueries(['todos']);
  }, [ctx.searchTerm, ctx.isOnlyIncomplete, queryClient]);

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
