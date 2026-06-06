import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale, isRtl } from '@/lib/i18n/config';
import { LanguageToggle } from '@/components/landing/LanguageToggle';

export const metadata: Metadata = {
  title: 'NoorQuest',
  description: 'Bright Adventures in Faith for Little Hearts',
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
        <NextIntlClientProvider messages={messages} locale={locale}>
          <div className="absolute right-4 top-4 z-50">
            <LanguageToggle current={locale as Locale} />
          </div>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
