import React, { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import Head from 'next/head';
import { createPagesBrowserClient, Session } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import GlobalStyle from '../styles/GlobalStyle';
import Colors from '../styles/Colors';

const App = ({
  Component,
  pageProps
}: AppProps<{
  initialSession: Session;
}>) => {
  const [ready, setReady] = useState(false);
  const [supabaseClient] = useState(() => createPagesBrowserClient());

  useEffect(() => setReady(true), []);

  if (!ready) return <div style={{ backgroundColor: Colors.PRIMARY }} />;

  return (
    <>
      <Head>
        <title>하대겸 | Daegyeom Ha</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
        <ChakraProvider>
          <GlobalStyle />
          <Component {...pageProps} />
        </ChakraProvider>
      </SessionContextProvider>
    </>
  );
};

export default App;
