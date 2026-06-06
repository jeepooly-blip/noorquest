import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/landing/Hero';
import { AudienceSplit } from '@/components/landing/AudienceSplit';

export default async function LandingPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations('Landing');
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24">
      <Hero locale={locale as 'en' | 'ar'} />
      <AudienceSplit
        locale={locale as 'en' | 'ar'}
        kidLabel={t('btn_kid')}
        parentLabel={t('btn_parent')}
      />
      <p className="mt-16 text-sm text-ink/50">{t('scholar_note')}</p>
    </main>
  );
}
