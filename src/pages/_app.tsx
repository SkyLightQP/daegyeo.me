import React, { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import Head from 'next/head';
import GlobalStyle from '../styles/GlobalStyle';
import Colors from '../styles/Colors';

const App = ({ Component, pageProps }: AppProps) => {
  const [ready, setReady] = useState(false);

  useEffect(() => setReady(true), []);

  if (!ready) return <div style={{ backgroundColor: Colors.PRIMARY }} />;

  return (
    <>
      <Head>
        <title>daegyeo.me</title>
      </Head>
      <ChakraProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
};

export default App;
