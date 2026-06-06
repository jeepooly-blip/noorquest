'use client';

import { LumiMascot } from '@/components/kid/LumiMascot';
import { useTranslations } from 'next-intl';

interface HeroProps {
  locale: 'en' | 'ar' | 'fr' | 'id';
}

export function Hero({ locale }: HeroProps) {
  const t = useTranslations('Landing');

  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-6">
        <LumiMascot size={180} pose="celebrate" />
      </div>
      <h1 className="mb-4 text-4xl font-extrabold leading-tight md:text-6xl">
        {t('title')}
      </h1>
      <p className="mb-10 max-w-xl text-lg text-ink/70 md:text-xl">
        {t('subtitle')}
      </p>
    </div>
  );
}
