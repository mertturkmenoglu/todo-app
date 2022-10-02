import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { DeleteTodoPopup, Header, TodoForm } from '../../components';
import React, { useRef } from 'react';
import { isAuthenticated } from '../../utils';
import { TodoApi } from '../../services';
import { useQuery } from '@tanstack/react-query';

export interface TodoProps {
  id: number | null;
}

const Todo: NextPage<TodoProps> = ({ id }) => {
  const todoApi = useRef(new TodoApi());

  const { data, isLoading, isError } = useQuery(['todo'], async () => {
    if (id === null) {
      throw Error('Cannot get todo');
    }

    const res = await todoApi.current.getTodoById(id);

    if (res === null) {
      throw Error('Cannot get todo');
    }

    return res.data;
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Cannot get todo</div>;
  }

  if (!data) {
    return <div></div>;
  }

  return (
    <>
      <Head>
        <title>Todo</title>
      </Head>

      <DeleteTodoPopup />

      <div className="container mx-auto flex flex-col items-start font-mono">
        <Header variant="auth" />

        <main className="mt-16 flex w-full flex-col items-center">
          <div className="ml-2 flex flex-col items-center">
            <h2 className="text-5xl font-bold">Todo Details</h2>
            <TodoForm data={data} />
          </div>
        </main>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<TodoProps> = async (context) => {
  const result = isAuthenticated(context);

  if (!result) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const queryId = context.query.id;

  if (typeof queryId !== 'string' || isNaN(parseInt(queryId))) {
    return {
      props: {
        id: null,
      },
    };
  }

  return {
    props: {
      id: parseInt(queryId),
    },
  };
};

export default Todo;
