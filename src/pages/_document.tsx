import React from 'react';
import { Head, Html, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html lang="ko">
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="favicon.ico" />

        <meta name="theme-color" content="#f0f4f5" />
        <meta name="description" content="Portfolio of Daegyeom Ha" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
