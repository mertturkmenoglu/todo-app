import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import React, { useRef, useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';
import { Header, Pagination, Popup, TextField, TodoList } from '../components';
import { SubmitHandler, useForm } from 'react-hook-form';
import { debounce } from 'debounce';
import { isAuthenticated } from '../utils';
import { TodoApi } from '../services';
import { useQuery } from '@tanstack/react-query';
import { isApiError } from '../services/common/isApiError';

export interface NewTodoInputs {
  text: string;
}

const Home: NextPage = () => {
  const [isOnlyNotCompleted, setIsOnlyNotCompleted] = useState(false);
  const [isNewTodoOpen, setIsNewTodoOpen] = useState(false);
  const [isDeleteTodoOpen, setIsDeleteTodoOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  // eslint-disable-next-line @typescript-eslint/naming-convention,@typescript-eslint/no-unused-vars,unused-imports/no-unused-vars,no-unused-vars
  const [_paginationIndex, setPaginationIndex] = useState(1);
  const todoApi = useRef(new TodoApi());

  const { data, isLoading, isError } = useQuery(['todos'], async () => {
    const result = await todoApi.current.getTodos();

    if (isApiError(result)) {
      throw Error(result.message);
    }

    return result.data;
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<NewTodoInputs>();

  const onSubmit: SubmitHandler<NewTodoInputs> = (inp) => {
    console.log(inp);
  };

  const onSearchTermUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearchTerm(inputValue);

    const filter = debounce(() => {
      if (inputValue === '') {
        //setData([]);
        return;
      }

      //setData((prev) => prev.filter((item) => item.text.toLowerCase().includes(inputValue.toLowerCase())));
    }, 500);

    filter();
  };

  if (isError) {
    return <div>Something went wrong.</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Something went wrong.</div>;
  }

  return (
    <>
      <Head>
        <title>Todo App</title>
      </Head>

      <Popup
        title="New Todo"
        isOpen={isNewTodoOpen}
        setIsOpen={setIsNewTodoOpen}
      >
        <>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full"
          >
            <TextField
              label="Text"
              placeholder="Enter a task"
              {...register('text', {
                required: 'Text is required',
              })}
              error={{ type: errors.text?.type, message: errors.text?.message }}
            />

            <button className="mt-16 w-full rounded bg-amber-300 py-2 text-black">Create</button>
          </form>
        </>
      </Popup>

      <Popup
        title="Delete Todo"
        isOpen={isDeleteTodoOpen}
        setIsOpen={setIsDeleteTodoOpen}
      >
        <div className="w-full">
          <div>
            Are you sure you want to delete{' '}
            <span className="italic text-amber-500">{data.data.find((el) => el.id === deleteItemId)?.text ?? ''}</span>
          </div>

          <div className="mt-16 flex w-full space-x-4">
            <button className="w-full rounded bg-rose-500 py-2 text-neutral-50">Delete</button>
            <button
              className="w-full rounded border border-neutral-500 py-2 text-neutral-800 hover:bg-neutral-500 hover:text-neutral-50"
              onClick={() => setIsDeleteTodoOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Popup>

      <div className="container mx-auto flex flex-col items-start font-mono">
        <Header />

        <main className="mt-16 w-full">
          <div className="ml-2 flex items-center justify-between">
            <h2 className="ml-2 text-5xl font-bold">My Todos</h2>
            <button
              className="ml-4 flex items-center bg-amber-300 py-2 px-8"
              onClick={() => setIsNewTodoOpen(true)}
            >
              <PlusIcon className="h-5 w-5 text-black" />
              <span className="ml-2">New Todo</span>
            </button>
          </div>

          <div className="mt-12 flex w-full items-center pl-4">
            <input
              type="search"
              className="w-full border border-black py-2 px-4 focus:outline-none focus:ring focus:ring-amber-300 focus:ring-offset-2"
              placeholder="Search"
              value={searchTerm}
              onChange={onSearchTermUpdate}
            />
          </div>

          <div className="mt-2 flex pl-2">
            <input
              type="checkbox"
              className="ml-2 accent-amber-300"
              defaultChecked={isOnlyNotCompleted}
              onChange={(e) => {
                setIsOnlyNotCompleted(e.target.checked);
              }}
            />
            <div className="ml-4">Show only incomplete items</div>
          </div>

          <hr className="mt-4 ml-4 border-2 border-amber-500" />

          <div className="mt-4 w-full">
            <TodoList
              setDeleteItemId={setDeleteItemId}
              searchTerm={searchTerm}
              setIsDeleteTodoOpen={setIsDeleteTodoOpen}
            />
          </div>

          {data.data.length !== 0 && (
            <div className="mt-8 flex w-full justify-center">
              <Pagination
                currentPage={_paginationIndex}
                totalPages={20}
                onItemClick={(index) => setPaginationIndex(index)}
                onPrevClick={() => setPaginationIndex((prev) => prev - 1)}
                onNextClick={() => setPaginationIndex((prev) => prev + 1)}
              />
            </div>
          )}
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
        destination: '/landing',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Home;
