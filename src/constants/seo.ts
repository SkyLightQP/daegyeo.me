import { DefaultSeoProps } from 'next-seo';

export const DEFAULT_SEO: DefaultSeoProps = {
  title: '하대겸 | Daegyeom Ha',
  description: '우리 생활을 더 편리하게 만듭니다. 개발자 하대겸입니다.',
  canonical: 'https://daegyeo.me',
  themeColor: '#35425A',
  openGraph: {
    url: 'https://daegyeo.me',
    title: '하대겸 | Daegyeom Ha',
    description: '우리 생활을 더 편리하게 만듭니다. 개발자 하대겸입니다.',
    siteName: '하대겸 | Daegyeom Ha',
    images: [
      {
        url: 'https://daegyeo.me/og-image.png',
        width: 1200,
        height: 630,
        alt: '하대겸 프로필 대표 이미지'
      }
    ]
  }
};
