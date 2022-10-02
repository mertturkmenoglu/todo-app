import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { AuthApi } from '../../services';
import { useRouter } from 'next/router';

export interface HeaderProps {
  variant?: 'auth' | 'landing' | 'default';
}

function Header({ variant = 'default' }: HeaderProps): JSX.Element {
  const router = useRouter();

  if (variant === 'auth') {
    return (
      <header className={clsx('mt-8 flex w-full items-center justify-center bg-neutral-100 px-16 py-4')}>
        <Link href="/">
          <a className="text-3xl font-bold text-black">Squirrel Todo App</a>
        </Link>
      </header>
    );
  }

  if (variant === 'landing') {
    return (
      <header className={clsx('mt-8 flex w-full items-center justify-between bg-neutral-100 px-16 py-4')}>
        <Link href="/">
          <a className="text-3xl font-bold text-black">Squirrel Todo App</a>
        </Link>
        <Link href="/login">
          <a className={clsx('bg-amber-300 py-2 px-8 hover:scale-105')}>Login</a>
        </Link>
      </header>
    );
  }

  return (
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
            <button
              className={clsx('font-semibold text-amber-500 hover:underline')}
              onClick={async () => {
                const api = new AuthApi();
                const result = await api.logout();

                if (result) {
                  await router.push('/landing');
                }
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
