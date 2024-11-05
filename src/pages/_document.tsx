import React from 'react';
import { Head, Html, Main, NextScript } from 'next/document';
import { GoogleAnalytics } from '@next/third-parties/google';

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
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
