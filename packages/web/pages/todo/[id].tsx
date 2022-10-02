import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import clsx from 'clsx';
import Head from 'next/head';
import { Popup, TextField } from '../../components';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { ArrowPathRoundedSquareIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { isAuthenticated } from '../../utils';

export interface TodoInputs {
  isCompleted: boolean;
  text: string;
}

const Todo: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<TodoInputs>({
    isCompleted: true,
    text: 'Lorem ipsum dolor sit amet',
  });

  const router = useRouter();

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<TodoInputs>({
    defaultValues: {
      isCompleted: data.isCompleted,
      text: data.text,
    },
  });

  const onSubmit: SubmitHandler<TodoInputs> = (inp) => {
    console.log(inp);
  };

  return (
    <>
      <Head>
        <title>Todo</title>
      </Head>

      <Popup
        title="Delete Todo"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <div className="w-full">
          <div>
            Are you sure you want to delete <span className="italic text-amber-500">{data.text}</span>
          </div>

          <div className="mt-16 flex w-full space-x-4">
            <button className="w-full rounded bg-rose-500 py-2 text-neutral-50">Delete</button>
            <button
              className="w-full rounded border border-neutral-500 py-2 text-neutral-800 hover:bg-neutral-500 hover:text-neutral-50"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Popup>

      <div className="container mx-auto flex flex-col items-start font-mono">
        <header className={clsx('mt-8 flex w-full items-center justify-between bg-neutral-100 px-16 py-4')}>
          <Link href="/">
            <a className="text-3xl font-bold text-black">Squirrel Todo App</a>
          </Link>
          <nav>
            <ul className="flex items-center space-x-2">
              <li>
                <Link href="/account/profile">
                  <a className={clsx('font-semibold text-amber-500 hover:underline')}>My Account</a>
                </Link>
              </li>

              <li>
                <button className={clsx('font-semibold text-amber-500 hover:underline')}>Logout</button>
              </li>
            </ul>
          </nav>
        </header>

        <main className="mt-16 flex w-full flex-col items-center">
          <div className="ml-2 flex items-center justify-between">
            <h2 className="text-5xl font-bold">Todo Details</h2>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-16 w-1/3"
          >
            <div>
              <span>Id: {router.query.id}</span>
            </div>

            <TextField
              label="Task"
              type="text"
              className="mt-4"
              {...register('text', {
                required: 'Text is required',
              })}
              error={{
                type: errors.text?.type,
                message: errors.text?.message,
              }}
            />

            <div className="mt-4 flex items-center">
              <div>Completed:</div>
              <div className="ml-4 text-amber-500">{data.isCompleted ? 'True' : 'False'}</div>
              <button
                className="ml-4 flex items-center bg-amber-300 px-4 py-2"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setData((prev) => ({
                    ...prev,
                    isCompleted: !prev.isCompleted,
                  }));
                }}
              >
                <ArrowPathRoundedSquareIcon className="h-5 w-5" />
                <span className="ml-4">Change</span>
              </button>
            </div>

            <div className="my-8 flex space-x-4">
              <button className={clsx('w-full rounded bg-amber-300 py-2')}>Update</button>
              <button
                className={clsx('w-full rounded bg-rose-500 py-2 text-neutral-50')}
                onClick={() => setIsOpen(true)}
              >
                Delete
              </button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const result = isAuthenticated(context);

  if (!result) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Todo;
