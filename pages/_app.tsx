import '@/styles/globals.css';
import Layout from '@/components/Layout';
import type { AppProps } from 'next/app';
import { Roboto } from 'next/font/google';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
      <QueryClientProvider client={queryClient}>
        <div className={roboto.className}>
          <Layout >
            <Component {...pageProps} />
          </Layout>
        </div>
        <ReactQueryDevtools />
      </QueryClientProvider>
  )
}


