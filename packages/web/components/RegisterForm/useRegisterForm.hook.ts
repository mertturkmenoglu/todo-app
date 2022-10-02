import { useRef } from 'react';
import { AuthApi } from '../../services';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { isApiError } from '../../services/common/isApiError';
import { toast } from 'react-toastify';

export interface RegisterInputs {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export function useRegisterForm() {
  const api = useRef(new AuthApi());
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInputs>();

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    const res = await api.current.register(data);

    if (isApiError(res)) {
      toast(res.response?.data.message ?? 'Error happened', {
        type: 'error',
      });
      return;
    }

    toast('Registered successfully', {
      type: 'success',
      delay: 2000,
    });

    setTimeout(async () => {
      await router.push('/login');
    }, 2000);
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
}
