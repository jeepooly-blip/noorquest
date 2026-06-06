import { getTranslations, setRequestLocale } from 'next-intl/server';

export default async function SalahPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations('Salah');
  const tc = await getTranslations('Common');
  return (
    <main className="mx-auto max-w-2xl p-8 text-center">
      <div className="text-7xl">🕌</div>
      <h1 className="mt-4 text-3xl font-extrabold">{t('title')}</h1>
      <p className="mt-2 text-ink/60">{t('sub')}</p>
      <div className="mt-8 rounded-3xl bg-white p-8 shadow-md">
        <p className="text-lg font-semibold text-ink/60">🚧 {tc('coming_soon')}</p>
        <p className="mt-2 text-sm text-ink/50">
          See <a href="/prototypes/salah-mat.html" className="text-sky-600 underline">prototype</a> for the full interactive version.
        </p>
      </div>
    </main>
  );
}
