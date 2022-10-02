import { useContext, useEffect, useRef } from 'react';
import { HomeContext } from '../../contexts';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { TodoApi } from '../../services';
import { TodoQueryParams } from '../../services/common/types/TodoQueryParams';
import { isApiError } from '../../services/common/isApiError';

export function useTodoList() {
  const ctx = useContext(HomeContext);
  const queryClient = useQueryClient();

  const todoApi = useRef(new TodoApi());

  const { data, isLoading, isError, refetch } = useQuery(
    ['todos', ctx.paginationIndex],
    async () => {
      const query: Partial<TodoQueryParams> = {
        page: ctx.paginationIndex,
        order: 'desc',
        completed: ctx.isOnlyIncomplete ? false : undefined,
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
      staleTime: 1000,
    }
  );

  useEffect(() => {
    const invalidate = async () => {
      await queryClient.invalidateQueries(['todos']);
      await refetch();
    };

    invalidate();
  }, [ctx.searchTerm, ctx.isOnlyIncomplete, queryClient, refetch]);

  return {
    data,
    isLoading,
    isError,
  };
}
