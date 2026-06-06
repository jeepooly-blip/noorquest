export const locales = ['en', 'ar', 'fr', 'id'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية',
  fr: 'Français',
  id: 'Bahasa Indonesia',
};

export const rtlLocales: Locale[] = ['ar'];

export const localeEmoji: Record<Locale, string> = {
  en: '🇬🇧',
  ar: '🇸🇦',
  fr: '🇫🇷',
  id: '🇮🇩',
};

export function isRtl(locale: string): boolean {
  return rtlLocales.includes(locale as Locale);
}
