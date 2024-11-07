'use client';

import { FC, PropsWithChildren, useEffect, useState } from 'react';
import Script from 'next/script';
import { ChakraProvider } from '@chakra-ui/react';
import type { Metadata, Viewport } from 'next';
import GlobalStyle from '../styles/GlobalStyle';
import Colors from '../styles/Colors';

export const metadata: Metadata = {
  title: '하대겸 | Daegyeom Ha',
  description: '우리 생활을 더 편리하게 만듭니다. 개발자 하대겸입니다.',
  authors: [{ name: '하대겸' }],
  metadataBase: new URL('https://daegyeo.me'),
  openGraph: {
    url: 'https://daegyeo.me',
    title: '하대겸 | Daegyeom Ha',
    description: '우리 생활을 더 편리하게 만듭니다. 개발자 하대겸입니다.',
    siteName: '하대겸 | Daegyeom Ha',
    images: [
      {
        url: 'https://daegyeo.me/og-image.png',
        width: 1200,
        height: 630,
        alt: '하대겸 프로필 대표 이미지'
      }
    ],
    locale: 'ko_KR',
    type: 'website'
  }
};

export const viewport: Viewport = {
  themeColor: Colors.PRIMARY,
  width: 'device-width',
  initialScale: 1
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => setReady(true), []);

  if (!ready) return <div style={{ backgroundColor: Colors.PRIMARY }} />;

  return (
    <html lang="ko">
      <head>
        <title>하대겸 | Daegyeom Ha</title>
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
