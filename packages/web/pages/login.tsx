import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { isAuthenticated } from '../utils';
import { LoginForm } from '../components';
import { Header } from '../components/Header';

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="container mx-auto flex flex-col items-center font-mono">
        <Header variant="auth" />

        <main className="mt-32 flex w-full flex-col items-center text-center">
          <h2 className="text-3xl font-bold">Login</h2>
          <LoginForm />
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

export default Login;
