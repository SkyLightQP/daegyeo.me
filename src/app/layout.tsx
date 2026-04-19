import { FC, PropsWithChildren } from 'react';
import localFont from 'next/font/local';
import './globals.css';

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
});

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="ko">
      <head>
        <title>title</title>
        <meta charSet="utf-8" />
      </head>
      <body className={`${pretendard.className} bg-gray-100 text-zinc-900`}>
        <div className="mx-auto w-full min-w-132.5 max-w-220 py-24">{children}</div>
      </body>
    </html>
  );
};

export default RootLayout;
