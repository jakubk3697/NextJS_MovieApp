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

/**
 * @description It creates a new query client
 * @desc
 */
const queryClient = new QueryClient();

/**
 * 
 * @param Component 
 * @param pageProps
 * @description It wraps the app with the Layout component and the react-query provider
 * @description It also adds the roboto font and react-query provider with devtools to the app
 * @returns The app wrapped with the Layout component and the react-query provider
 */
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


