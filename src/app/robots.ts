import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/admin/content/', '/admin/login/']
    },
    sitemap: 'https://daegyeo.me/sitemap.xml'
  };
}
