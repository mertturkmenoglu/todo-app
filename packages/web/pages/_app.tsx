import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeContextProvider from '../contexts/HomeContext/HomeContextProvider';
import TodoContextProvider from '../contexts/TodoContext/TodoContextProvider';

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <HomeContextProvider>
        <TodoContextProvider>
          <Component {...pageProps} />
          <ReactQueryDevtools />
          <ToastContainer />
        </TodoContextProvider>
      </HomeContextProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
