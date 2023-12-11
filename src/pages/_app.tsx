import type { AppProps } from 'next/app'
import { Layout } from '@/components/Layout';
import '../styles/global.css';
import '../styles/loader.css';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>Secret Santa</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}