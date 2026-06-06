import type { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n/config';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://noorquest-seven.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/map',
    '/market',
    '/salah',
    '/stories',
    '/tree',
    '/dashboard',
  ];

  const lastModified = new Date();

  return routes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${route}`,
      lastModified,
      changeFrequency: route === '' ? 'weekly' : 'monthly' as const,
      priority: route === '' ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${SITE_URL}/${l}${route}`])
        ),
      },
    }))
  );
}
