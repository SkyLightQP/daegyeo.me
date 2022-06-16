import { AppProps } from 'next/app';
import React from 'react';
import Head  from 'next/head';
import GlobalStyle from '../styles/GlobalStyle';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>Daegyeom Ha</title>
      </Head>
      <GlobalStyle />
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </>
  );
};

export default App;
