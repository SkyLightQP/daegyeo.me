import { FC, PropsWithChildren } from 'react';
import localFont from 'next/font/local';
import type { Metadata } from 'next';
import './globals.css';

const SITE_URL = 'https://daegyeo.me';
const SITE_TITLE = '하대겸 Daegyeom Ha';
const SITE_DESCRIPTION = 'Daegyeom Ha, a Software Engineer';

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-sans',
});

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body className="relative bg-gray-50 text-zinc-900">
        <div className="mx-auto w-full min-w-132.5 max-w-200 px-6 py-24 sm:px-0">{children}</div>
        <div className="pointer-events-none absolute bottom-0 right-0 h-128 w-lg -mr-20 sm:mr-0 bg-linear-to-tl from-blue-200/30 via-sky-100/15 to-transparent blur-3xl" />
      </body>
    </html>
  );
};

export default RootLayout;
