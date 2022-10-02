import { SubmitHandler, useForm } from 'react-hook-form';
import { Todo, TodoApi } from '../../services';
import { toast } from 'react-toastify';
import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export interface TodoInputs {
  text: string;
}

export function useUpdateTodo(data: Todo) {
  const todoApi = useRef(new TodoApi());
  const queryClient = useQueryClient();

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<TodoInputs>({
    defaultValues: {
      text: data.text,
    },
  });

  const updateTodoMutation = useMutation(
    ['updateTodo'],
    async (input: TodoInputs) => {
      const response = await todoApi.current.updateTodo(data.id, input);

      if (!response) {
        throw new Error('Cannot update item');
      }

      return response;
    },
    {
      onError: (err: { message: string }) => {
        toast(err.message, {
          autoClose: 2000,
          type: 'error',
        });
      },
      onSuccess: async () => {
        toast('Updated', {
          autoClose: 2000,
          type: 'success',
        });

        await queryClient.invalidateQueries(['todo']);
      },
    }
  );

  const onSubmit: SubmitHandler<TodoInputs> = (input) => {
    updateTodoMutation.mutate(input);
  };

  const onStatusChange = async () => {
    const result = await todoApi.current.updateTodo(data.id, {
      isCompleted: !data?.isCompleted,
    });

    const msg = result ? 'Updated' : 'Error happened';
    toast(msg, {
      autoClose: 1000,
      type: result ? 'success' : 'error',
    });
    await queryClient.invalidateQueries(['todo']);
    await queryClient.fetchQuery(['todo']);
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    onStatusChange,
  };
}
