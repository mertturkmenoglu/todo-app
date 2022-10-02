import React from 'react';
import { TextField } from '../TextField';
import clsx from 'clsx';
import Link from 'next/link';
import { useLoginForm } from './useLoginForm.hook';

function LoginForm(): JSX.Element {
  const { register, handleSubmit, onSubmit, errors } = useLoginForm();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-16 w-1/3"
    >
      <TextField
        label="Email"
        type="email"
        className="mt-8"
        autoComplete="username"
        placeholder="Email"
        {...register('email', {
          required: 'Enter your email',
        })}
        error={{
          type: errors.email?.type,
          message: errors.email?.message,
        }}
      />

      <TextField
        label="Password"
        type="password"
        className="mt-4"
        autoComplete="current-password"
        placeholder="Password"
        {...register('password', {
          required: 'Enter your password',
        })}
        error={{
          type: errors.password?.type,
          message: errors.password?.message,
        }}
      />

      <button className={clsx('my-8 w-full rounded bg-amber-300 py-2')}>Login</button>

      <Link href="/register">
        <a className="mt-8 font-semibold">Sign up</a>
      </Link>
    </form>
  );
}

export default LoginForm;
