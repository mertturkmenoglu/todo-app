import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import clsx from 'clsx';
import { SubmitHandler, useForm } from 'react-hook-form';
import Link from 'next/link';
import { TextField } from '../components';
import Head from 'next/head';
import { isAuthenticated } from '../utils';
import { Header } from '../components/Header';
import { useRef } from 'react';
import { AuthApi } from '../services';
import { isApiError } from '../services/common/isApiError';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export interface RegisterInputs {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: NextPage = () => {
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

  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>
      <div className="container mx-auto flex flex-col items-center font-mono">
        <Header variant="auth" />

        <main className="mt-32 flex w-full flex-col items-center text-center">
          <h2 className="text-3xl font-bold">Sign up</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-16 w-1/3"
          >
            <TextField
              label="Full Name *"
              type="text"
              className="mt-8"
              autoComplete="name"
              placeholder="Full Name"
              {...register('fullName', {
                required: 'Full name is required',
              })}
              error={{
                type: errors.fullName?.type,
                message: errors.fullName?.message,
              }}
            />

            <TextField
              label="Email *"
              type="email"
              className="mt-4"
              autoComplete="username"
              placeholder="Email"
              {...register('email', {
                required: 'Email is required',
              })}
              error={{
                type: errors.email?.type,
                message: errors.email?.message,
              }}
            />

            <TextField
              label="Password *"
              type="password"
              className="mt-4"
              autoComplete="new-password"
              placeholder="Password"
              {...register('password', {
                required: 'Password is required',
              })}
              error={{
                type: errors.password?.type,
                message: errors.password?.message,
              }}
            />

            <TextField
              label="Confirm Password *"
              type="password"
              className="mt-4"
              autoComplete="new-password"
              placeholder="Confirm Password"
              {...register('confirmPassword', {
                required: 'Confirm password is required',
              })}
              error={{
                type: errors.confirmPassword?.type,
                message: errors.confirmPassword?.message,
              }}
            />

            <button className={clsx('my-8 w-full rounded bg-amber-300 py-2')}>Sign up</button>

            <Link href="/login">
              <a className="mt-8 font-semibold">Login</a>
            </Link>
          </form>
        </main>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const result = isAuthenticated(context);

  if (result) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Register;
