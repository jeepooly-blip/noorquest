export interface XpEvent {
  type: 'halal_correct' | 'haram_redirect' | 'mushbooh_ask' | 'story_complete' | 'wudu_step' | 'salah_position';
  points: number;
}

export const XP_RULES: Record<XpEvent['type'], number> = {
  halal_correct: 10,
  haram_redirect: 5,
  mushbooh_ask: 5,
  story_complete: 20,
  wudu_step: 3,
  salah_position: 5,
};

export interface Level {
  level: number;
  threshold: number;
  title: { en: string; ar: string };
}

export const LEVELS: Level[] = [
  { level: 1, threshold: 0,    title: { en: 'Newcomer',    ar: 'مبتدئ' } },
  { level: 2, threshold: 100,  title: { en: 'Explorer',    ar: 'مستكشف' } },
  { level: 3, threshold: 250,  title: { en: 'Learner',     ar: 'متعلم' } },
  { level: 4, threshold: 500,  title: { en: 'Hero',        ar: 'بطل' } },
  { level: 5, threshold: 1000, title: { en: 'Halal Hero',  ar: 'بطل الحلال' } },
];

export function levelFromXp(xp: number): Level {
  let current = LEVELS[0]!;
  for (const lvl of LEVELS) {
    if (xp >= lvl.threshold) current = lvl;
  }
  return current;
}

export function nextLevel(current: Level): Level | null {
  const idx = LEVELS.findIndex((l) => l.level === current.level);
  return LEVELS[idx + 1] ?? null;
}

export function progressToNext(xp: number): { current: number; target: number; pct: number } {
  const cur = levelFromXp(xp);
  const nxt = nextLevel(cur);
  if (!nxt) return { current: xp, target: xp, pct: 100 };
  const progress = xp - cur.threshold;
  const total = nxt.threshold - cur.threshold;
  return { current: progress, target: total, pct: Math.round((progress / total) * 100) };
}

export interface Badge {
  type: string;
  emoji: string;
  name: { en: string; ar: string };
}

export const BADGES: Badge[] = [
  { type: 'first_scan',   emoji: '⭐', name: { en: 'First Scan',     ar: 'أول مسح' } },
  { type: 'on_fire',      emoji: '🔥', name: { en: 'On Fire',        ar: 'في النار' } },
  { type: 'halal_hero',   emoji: '🌟', name: { en: 'Halal Hero',     ar: 'بطل الحلال' } },
  { type: 'smart_picker', emoji: '🛡️', name: { en: 'Smart Picker',   ar: 'اختيار ذكي' } },
  { type: 'asks_parents', emoji: '🤔', name: { en: 'Asks Parents',   ar: 'يسأل الأهل' } },
  { type: 'wudu_star',    emoji: '🌙', name: { en: 'Wudu Star',      ar: 'نجمة الوضوء' } },
  { type: 'story_listener', emoji: '📖', name: { en: 'Story Listener', ar: 'مستمع القصص' } },
  { type: 'artist',       emoji: '🎨', name: { en: 'Artist',         ar: 'فنان' } },
];
