import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';

config.autoAddCss = false;

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Voice Recorder</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
