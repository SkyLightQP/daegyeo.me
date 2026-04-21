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
      <body className={`relative ${pretendard.className} bg-gray-50 text-zinc-900`}>
        <div className="mx-auto w-full min-w-132.5 max-w-200 px-6 py-24 sm:px-0">{children}</div>
        <div className="pointer-events-none absolute bottom-0 right-0 h-128 w-lg -mr-20 sm:mr-0 bg-linear-to-tl from-blue-200/25 via-sky-100/15 to-transparent blur-3xl" />
      </body>
    </html>
  );
};

export default RootLayout;
