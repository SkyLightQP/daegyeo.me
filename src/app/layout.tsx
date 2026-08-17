import { FC, PropsWithChildren } from 'react';
import localFont from 'next/font/local';
import type { Metadata } from 'next';
import { cn } from '@/lib/utils';
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
  variable: '--font-pretendard',
});

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="ko" className={cn(pretendard.variable, 'overflow-x-hidden')}>
      <body className="relative overflow-x-hidden bg-gray-50 text-zinc-900">{children}</body>
    </html>
  );
};

export default RootLayout;
