import React from 'react';
import { Head, Html, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html lang='ko'>
      <Head>
        <meta charSet='utf-8' />
        <link rel='icon' href='favicon.ico' />

        <meta name='theme-color' content='#f0f4f5' />
        <meta
          name='description'
          content='Daegyeom Ha'
        />


        <script async src='https://www.googletagmanager.com/gtag/js?id=G-4D5DB39K0B' />
        {/* eslint-disable-next-line react/no-danger */}
        <script dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-4D5DB39K0B');
          `
        }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
