import { FC, PropsWithChildren } from 'react';
import './globals.css';

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="ko">
      <head>
        <title>title</title>
        <meta charSet="utf-8" />
      </head>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
