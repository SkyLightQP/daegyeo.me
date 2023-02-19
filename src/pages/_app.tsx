import React, { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';
import GlobalStyle from '../styles/GlobalStyle';

const App = ({ Component, pageProps }: AppProps) => {
  const [ready, setReady] = useState(false);

  useEffect(() => setReady(true), []);

  if (!ready) return <>Loading...</>;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Daegyeom Ha</title>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2490453096003621"
          crossOrigin="anonymous"
        />
      </Head>
      <ChakraProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
};

export default App;
