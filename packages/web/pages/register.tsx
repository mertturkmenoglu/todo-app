import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { isAuthenticated } from '../utils';
import { Header } from '../components/Header';
import { RegisterForm } from '../components';

const Register: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>
      <div className="container mx-auto flex flex-col items-center font-mono">
        <Header variant="auth" />

        <main className="mt-32 flex w-full flex-col items-center text-center">
          <h2 className="text-3xl font-bold">Sign up</h2>
          <RegisterForm />
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
