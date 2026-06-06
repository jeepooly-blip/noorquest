'use client';

import { Link } from '@/lib/i18n/navigation';

interface AudienceSplitProps {
  locale: 'en' | 'ar' | 'fr' | 'id';
  kidLabel: string;
  parentLabel: string;
}

export function AudienceSplit({ locale, kidLabel, parentLabel }: AudienceSplitProps) {
  return (
    <div className="flex flex-col gap-6 sm:flex-row">
      <Link
        href="/map"
        className="group inline-flex flex-1 items-center justify-center gap-3 rounded-3xl bg-sun-500 px-8 py-8 text-2xl font-extrabold text-ink shadow-lg transition-all hover:-translate-y-1 hover:bg-sun-300 hover:shadow-xl"
      >
        <span className="text-3xl" aria-hidden="true">🌟</span>
        <span>{kidLabel}</span>
      </Link>
      <Link
        href="/dashboard"
        className="group inline-flex flex-1 items-center justify-center gap-3 rounded-3xl bg-sky-600 px-8 py-8 text-2xl font-extrabold text-white shadow-lg transition-all hover:-translate-y-1 hover:bg-sky-300 hover:text-ink hover:shadow-xl"
      >
        <span className="text-3xl" aria-hidden="true">👨‍👩‍👧</span>
        <span>{parentLabel}</span>
      </Link>
    </div>
  );
}
