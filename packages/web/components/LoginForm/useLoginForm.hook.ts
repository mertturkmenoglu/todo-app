import { useRef } from 'react';
import { AuthApi } from '../../services';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { isApiError } from '../../services/common/isApiError';
import { toast } from 'react-toastify';

export interface LoginInputs {
  email: string;
  password: string;
}

export function useLoginForm() {
  const api = useRef(new AuthApi());

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  const router = useRouter();

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    const result = await api.current.login(data);

    if (isApiError(result)) {
      toast(result.response?.data.message ?? 'Error happened', {
        type: 'error',
        theme: 'light',
      });
      return;
    }

    await router.push('/');
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
}
