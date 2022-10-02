import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import {
  DeleteTodoPopup,
  Header,
  HomeTitle,
  HomeTodoView,
  IncompleteSelector,
  NewTodoPopup,
  SearchBar,
} from '../components';
import { isAuthenticated } from '../utils';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Todo App</title>
      </Head>

      <NewTodoPopup />

      <DeleteTodoPopup />

      <div className="container mx-auto flex flex-col items-start font-mono">
        <Header />

        <main className="mt-16 w-full">
          <HomeTitle />

          <SearchBar />

          <IncompleteSelector />

          <hr className="mt-4 ml-4 border-2 border-amber-500" />

          <HomeTodoView />
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
