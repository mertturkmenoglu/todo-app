import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { isAuthenticated } from '../utils';
import { Header } from '../components/Header';

const Landing: NextPage = () => {
  return (
    <>
      <Head>
        <title>Todo App</title>
      </Head>
      <div className="container mx-auto flex flex-col items-center font-mono">
        <Header variant="landing" />

        <main className="mt-32 text-center">
          <h2 className="text-5xl font-bold">Best todo app ever</h2>
          <div className="mt-8">
            <span>Don&apos;t you have an account?</span>
            <Link href="/register">
              <a className="ml-2 font-semibold text-amber-400 underline">Sign up</a>
            </Link>
          </div>
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

export default Landing;
