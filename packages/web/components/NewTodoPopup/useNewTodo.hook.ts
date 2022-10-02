import { SubmitHandler, useForm } from 'react-hook-form';
import { useContext, useRef } from 'react';
import { TodoApi } from '../../services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isApiError } from '../../services/common/isApiError';
import { toast } from 'react-toastify';
import { HomeContext } from '../../contexts';

export interface NewTodoInputs {
  text: string;
}

export function useNewTodo() {
  const todoApi = useRef(new TodoApi());
  const ctx = useContext(HomeContext);
  const queryClient = useQueryClient();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<NewTodoInputs>();

  const newTodoMutation = useMutation(
    ['newTodo'],
    async (data: NewTodoInputs) => {
      const response = await todoApi.current.addTodo({
        text: data.text,
        isCompleted: false,
      });

      if (isApiError(response)) {
        throw new Error(response.response?.data.message);
      }
    },
    {
      onError: (error: { message: string }) => {
        toast(error.message, {
          autoClose: 2000,
          type: 'error',
        });
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries(['todos']);
        setValue('text', '');
        ctx.setIsNewTodoOpen(false);
      },
    }
  );

  const onSubmit: SubmitHandler<NewTodoInputs> = (input) => {
    newTodoMutation.mutate(input);
  };

  return {
    register,
    errors,
    handleSubmit,
    onSubmit,
  };
}
