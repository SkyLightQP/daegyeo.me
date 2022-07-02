import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';
import GlobalStyle from '../styles/GlobalStyle';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>Daegyeom Ha</title>
      </Head>
      <ChakraProvider>
        <GlobalStyle />
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
};

export default App;
