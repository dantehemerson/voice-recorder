import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { MainFont } from '~/fonts';
import './styles.css';

config.autoAddCss = false;

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>
          Voice Recorder Online - Free Audio Recording, Storage, and Sharing
        </title>
      </Head>
      <main className={MainFont.className}>
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
