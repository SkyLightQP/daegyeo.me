import React from 'react';
import { Head, Html, Main, NextScript } from 'next/document';
import { GoogleAnalytics } from '@next/third-parties/google';
import Colors from '../styles/Colors';

const Document = () => {
  return (
    <Html lang="ko">
      <Head>
        <script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2490453096003621"
          crossOrigin="anonymous"
          async
        />
        <GoogleAnalytics gaId="G-J0FQZH7MNY" />

        <meta charSet="utf-8" />

        <link rel="icon" href="favicon.ico" />
        <link rel="apple-touch-icon" href="favicon.ico" />

        <meta name="author" content="하대겸" />
        <meta name="keywords" content="하대겸, Daegyeom Ha, daegyeome, daegyeo.me" />
        <meta name="theme-color" content={Colors.PRIMARY} />
        <meta name="description" content="우리 생활을 더 편리하게 만듭니다. 개발자 하대겸입니다." />

        <meta property="og:site_name" content="하대겸 | Daegyeom Ha" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="하대겸 | Daegyeom Ha" />
        <meta property="og:description" content="우리 생활을 더 편리하게 만듭니다. 개발자 하대겸입니다." />
        <meta property="og:url" content="https://daegyeo.me" />
        <meta property="og:image" content="https://daegyeo.me/og-image.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
