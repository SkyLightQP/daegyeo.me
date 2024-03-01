import React from 'react';
import { Head, Html, Main, NextScript } from 'next/document';
import Colors from '../styles/Colors';

const Document = () => {
  return (
    <Html lang="ko">
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="favicon.ico" />
        <link rel="apple-touch-icon" href="favicon.ico" />
        <meta name="author" content="하대겸" />
        <meta name="keywords" content="Daegyeom Ha, 하대겸, Resume, Portfolio, 포트폴리오" />
        <meta name="theme-color" content={Colors.PRIMARY} />
        <meta name="description" content="Resume of Daegyeom Ha" />
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
