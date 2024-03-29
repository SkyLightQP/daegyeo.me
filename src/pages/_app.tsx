import React, { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import Head from 'next/head';
import Script from 'next/script';
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
      <Script
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2490453096003621"
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-J0FQZH7MNY" strategy="afterInteractive" />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
  
            gtag('config', 'G-J0FQZH7MNY');
            `
        }}
      />
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
