'use client';

import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { DefaultSeo } from 'next-seo';
import { ChakraProvider } from '@chakra-ui/react';
import Script from 'next/script';
import { DEFAULT_SEO } from '../constants/seo';
import GlobalStyle from '../styles/GlobalStyle';
import Colors from '../styles/Colors';

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => setReady(true), []);

  if (!ready) return <div style={{ backgroundColor: Colors.PRIMARY }} />;

  return (
    <html lang="ko">
      <DefaultSeo {...DEFAULT_SEO} />
      <head>
        <title>하대겸 | Daegyeom Ha</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2490453096003621"
          crossOrigin="anonymous"
          async
        />
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-J0FQZH7MNY" />
        <Script
          id="google-analytics"
          dangerouslySetInnerHTML={{
            __html: `
            		window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
            
                gtag('config', 'G-J0FQZH7MNY');
            `
          }}
        />
        <meta charSet="utf-8" />
        <link rel="icon" href="favicon.ico" />
        <link rel="apple-touch-icon" href="favicon.ico" />
      </head>
      <body>
        <ChakraProvider>
          <GlobalStyle />
          {children}
        </ChakraProvider>
      </body>
    </html>
  );
};

export default RootLayout;
