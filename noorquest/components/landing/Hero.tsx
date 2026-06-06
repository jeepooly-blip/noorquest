'use client';

import { LumiMascot } from '@/components/kid/LumiMascot';

interface HeroProps {
  locale: 'en' | 'ar';
}

export function Hero({ locale }: HeroProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-6">
        <LumiMascot size={180} />
      </div>
      <h1 className="mb-4 text-4xl font-extrabold leading-tight md:text-6xl">
        {locale === 'ar' ? 'مغامرات نور في الإيمان\nللقلوب الصغيرة' : 'Bright Adventures in Faith\nfor Little Hearts'}
      </h1>
      <p className="mb-10 max-w-xl text-lg text-ink/70 md:text-xl">
        {locale === 'ar'
          ? 'مكان آمن ومبهج يتعلم فيه أطفالنا المسلمون ويلعبون وينمون — مع أهاليهم.'
          : 'A safe, joyful place where Muslim children learn, play, and grow — with their parents by their side.'}
      </p>
    </div>
  );
}
