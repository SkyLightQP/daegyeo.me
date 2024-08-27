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
        <meta name="keywords" content="Daegyeom Ha, 하대겸, daegyeome, daegyeo.me" />
        <meta name="theme-color" content={Colors.PRIMARY} />
        <meta name="description" content="Resume of Daegyeom Ha" />

        <meta property="og:site_name" content="하대겸 | Daegyeom Ha" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="하대겸 | Daegyeom Ha" />
        <meta property="og:description" content="Resume of Daegyeom Ha" />
        <meta property="og:url" content="https://daegyeo.me/" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
