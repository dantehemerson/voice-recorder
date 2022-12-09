import { config } from '@fortawesome/fontawesome-svg-core';
import { Montserrat as MainFont } from '@next/font/google';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';

config.autoAddCss = false;

const mainFont = MainFont({ subsets: ['latin'] });

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Voice Recorder</title>
      </Head>
      <main className={mainFont.className}>
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
