import React from 'react';
import { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

const Document = () => {
  return (
    <Html lang="ko">
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="favicon.ico" />

        <meta name="theme-color" content="#f0f4f5" />
        <meta name="description" content="Daegyeom Ha" />

        <Script src="https://www.googletagmanager.com/gtag/js?id=G-4D5DB39K0B" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-4D5DB39K0B');
            `}
        </Script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
