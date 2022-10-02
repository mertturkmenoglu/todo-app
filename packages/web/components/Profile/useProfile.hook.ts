import { SubmitHandler, useForm } from 'react-hook-form';
import { User } from '../../services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import { UserApi } from '../../services/user';
import { isApiError } from '../../services/common/isApiError';
import { toast } from 'react-toastify';

export interface ProfileInputs {
  fullName: string;
}

export function useProfile(data: User) {
  const userApi = useRef(new UserApi());
  const queryClient = useQueryClient();

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<ProfileInputs>({
    defaultValues: {
      fullName: data.fullName,
    },
  });

  const updateUserMutation = useMutation(
    ['updateUser'],
    async (input: ProfileInputs) => {
      const result = await userApi.current.updateUser(input);

      if (isApiError(result)) {
        throw new Error(result.response?.data.message ?? 'An error happened');
      }

      return result.data;
    },
    {
      onError: (error: { message: string }) => {
        toast(error.message, {
          autoClose: 2000,
          type: 'error',
        });
      },
      onSuccess: async () => {
        toast('Updated', {
          autoClose: 2000,
          type: 'success',
        });
        await queryClient.invalidateQueries(['profile']);
        await queryClient.refetchQueries(['profile']);
      },
    }
  );

  const onSubmit: SubmitHandler<ProfileInputs> = (input) => {
    updateUserMutation.mutate(input);
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
  };
}
