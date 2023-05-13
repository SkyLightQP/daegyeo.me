import React, { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import Head from 'next/head';
import Script from 'next/script';
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
      <ChakraProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
};

export default App;
