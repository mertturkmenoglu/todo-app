import React from 'react';
import { TextField } from '../TextField';
import clsx from 'clsx';
import { SubmitHandler, useForm } from 'react-hook-form';
import { User } from '../../services';

export interface ProfileInputs {
  email: string;
  fullName: string;
}

export interface ProfileProps {
  data: User;
}

function Profile({ data }: ProfileProps): JSX.Element {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<ProfileInputs>({
    defaultValues: {
      email: data.email,
      fullName: data.fullName,
    },
  });

  const onSubmit: SubmitHandler<ProfileInputs> = (inp) => {
    console.log(inp);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-16 w-1/3"
    >
      <TextField
        label="Email"
        type="email"
        className="mt-8"
        inputClassName="cursor-not-allowed"
        disabled={true}
        {...register('email', {
          disabled: true,
        })}
        error={{
          type: errors.email?.type,
          message: errors.email?.message,
        }}
      />

      <TextField
        label="Full Name"
        className="mt-4"
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

      <button className={clsx('my-8 w-full rounded bg-amber-300 py-2')}>Update</button>
    </form>
  );
}

export default Profile;
