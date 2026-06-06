import type { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n/config';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'NoorQuest — Bright Adventures in Faith',
    short_name: 'NoorQuest',
    description:
      'A safe, gamified web app teaching Islamic basics to Muslim children in minority contexts. COPPA & GDPR-K compliant. No ads, ever.',
    start_url: `/${locales[0]}`,
    scope: '/',
    display: 'standalone',
    orientation: 'any',
    background_color: '#FFFBEB',
    theme_color: '#FFC861',
    categories: ['education', 'kids', 'lifestyle'],
    lang: 'en',
    dir: 'auto',
    icons: [
      {
        src: '/icons/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
  };
}
