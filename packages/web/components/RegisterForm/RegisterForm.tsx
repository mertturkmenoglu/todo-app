import React from 'react';
import { TextField } from '../TextField';
import clsx from 'clsx';
import Link from 'next/link';
import { useRegisterForm } from './useRegisterForm.hook';

function RegisterForm(): JSX.Element {
  const { register, handleSubmit, onSubmit, errors } = useRegisterForm();

  return (
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
  );
}

export default RegisterForm;
