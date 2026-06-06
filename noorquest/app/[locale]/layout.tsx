import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale, isRtl } from '@/lib/i18n/config';
import { LanguageToggle } from '@/components/landing/LanguageToggle';
import { ServiceWorkerRegister } from '@/components/landing/ServiceWorkerRegister';
import { PostHogProvider } from '@/components/landing/PostHogProvider';

export const metadata: Metadata = {
  title: {
    default: 'NoorQuest — Bright Adventures in Faith',
    template: '%s · NoorQuest',
  },
  description:
    'A safe, gamified web app teaching Islamic basics to Muslim children in minority contexts. COPPA & GDPR-K compliant. No ads, ever.',
  applicationName: 'NoorQuest',
  keywords: [
    'Islamic education for kids',
    'Muslim children app',
    'Halal scanner',
    'Quran stories',
    'Salah for kids',
    'NoorQuest',
  ],
  authors: [{ name: 'NoorQuest' }],
  creator: 'NoorQuest',
  publisher: 'NoorQuest',
  metadataBase: new URL('https://noorquest-seven.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://noorquest-seven.vercel.app',
    siteName: 'NoorQuest',
    title: 'NoorQuest — Bright Adventures in Faith',
    description:
      'A safe, gamified web app teaching Islamic basics to Muslim children. Scholar-reviewed. No ads.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NoorQuest — Bright Adventures in Faith',
    description:
      'A safe, gamified web app teaching Islamic basics to Muslim children. Scholar-reviewed. No ads.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [{ url: '/icons/icon.svg', type: 'image/svg+xml' }],
    apple: '/icons/icon.svg',
  },
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'NoorQuest',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFBEB' },
    { media: '(prefers-color-scheme: dark)', color: '#FFFBEB' },
  ],
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamic = 'force-dynamic';

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as Locale)) notFound();
  const messages = await getMessages();
  const dir = isRtl(locale) ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Inter:wght@400;500;600;700&family=Cairo:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen font-kid">
        <PostHogProvider>
          <NextIntlClientProvider messages={messages} locale={locale}>
            <div className="absolute right-4 top-4 z-50">
              <LanguageToggle current={locale as Locale} />
            </div>
            {children}
          </NextIntlClientProvider>
        </PostHogProvider>
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
