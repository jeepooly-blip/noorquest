import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/landing/Hero';
import { AudienceSplit } from '@/components/landing/AudienceSplit';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Landing' });
  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: {
      canonical: `/${locale}`,
    },
  };
}

export default async function LandingPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations('Landing');
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24">
      <Hero locale={locale as 'en' | 'ar' | 'fr' | 'id'} />
      <AudienceSplit
        locale={locale as 'en' | 'ar' | 'fr' | 'id'}
        kidLabel={t('btn_kid')}
        parentLabel={t('btn_parent')}
      />
      <p className="mt-16 text-sm text-ink/50">{t('scholar_note')}</p>
    </main>
  );
}
