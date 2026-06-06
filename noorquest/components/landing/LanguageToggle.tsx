'use client';

import { usePathname, useRouter } from '@/lib/i18n/navigation';
import { locales, localeEmoji, localeNames, type Locale } from '@/lib/i18n/config';

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
      className="cursor-pointer rounded-full border border-sky-300 bg-white px-3 py-1.5 text-sm font-semibold shadow-sm hover:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
    >
      {locales.map((l) => (
        <option key={l} value={l}>
          {`${localeEmoji[l]} ${localeNames[l]}`}
        </option>
      ))}
    </select>
  );
}
