import { useContext, useRef } from 'react';
import { TodoContext } from '../../contexts';
import { TodoApi } from '../../services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export function useDeleteTodo() {
  const ctx = useContext(TodoContext);
  const todoApi = useRef(new TodoApi());

  const router = useRouter();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(
    ['deleteTodo'],
    async () => {
      if (ctx.deleteTodoId === null) {
        throw new Error('Cannot delete todo');
      }

      const result = await todoApi.current.deleteTodoById(ctx.deleteTodoId);

      if (!result) {
        throw new Error('Cannot delete todo');
      }

      return result;
    },
    {
      onError: (err: { message: string }) => {
        toast(err.message, {
          autoClose: 2000,
          type: 'error',
        });
      },
      onSuccess: async () => {
        toast('Item deleted', {
          autoClose: 2000,
          type: 'success',
        });

        ctx.setIsDeleteTodoOpen(false);
        await queryClient.invalidateQueries(['todos', 'todo']);
        await router.push('/');
      },
    }
  );

  return { deleteMutation };
}
