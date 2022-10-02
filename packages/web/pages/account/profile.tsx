import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { Header, Profile } from '../../components';
import { isAuthenticated } from '../../utils';
import { useQuery } from '@tanstack/react-query';
import React, { useRef } from 'react';
import { UserApi } from '../../services/user';
import { isApiError } from '../../services/common/isApiError';

const ProfilePage: NextPage = () => {
  const userApi = useRef(new UserApi());

  const { data, isLoading, isError } = useQuery(['profile'], async () => {
    const result = await userApi.current.getCurrentUser();

    if (isApiError(result)) {
      throw Error(result.message);
    }

    return result.data;
  });

  return (
    <>
      <Head>
        <title>My Account</title>
      </Head>
      <div className="container mx-auto flex flex-col items-start font-mono">
        <Header />

        <main className="mt-16 flex w-full flex-col items-center">
          <div className="ml-2 flex items-center justify-between">
            <h2 className="text-5xl font-bold">My Account</h2>
          </div>

          {isError && <div>Something went wrong.</div>}

          {isLoading && <div>Loading...</div>}

          {data && <Profile data={data} />}
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

export default ProfilePage;
