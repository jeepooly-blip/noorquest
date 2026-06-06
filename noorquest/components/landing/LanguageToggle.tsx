'use client';

import { usePathname, useRouter } from '@/lib/i18n/navigation';
import { locales, type Locale } from '@/lib/i18n/config';

export function LanguageToggle({ current }: { current: Locale }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <select
      aria-label="Language"
      value={current}
      onChange={(e) => {
        const next = e.target.value as Locale;
        router.replace(pathname, { locale: next });
      }}
      className="rounded-full border border-sky-300 bg-white px-3 py-1.5 text-sm font-semibold"
    >
      {locales.map((l) => (
        <option key={l} value={l}>
          {l === 'en' ? '🇬🇧 English' : '🇸🇦 العربية'}
        </option>
      ))}
    </select>
  );
}
