'use client';

import { BADGES, type Badge as BadgeT } from '@/lib/gamification/xp';

interface ScorePanelProps {
  score: number;
  streak: number;
  halalCount: number;
  halalTotal: number;
  haramCount: number;
  haramTotal: number;
  mushCount: number;
  mushTotal: number;
  earnedBadges: Set<string>;
  locale: 'en' | 'ar';
}

export function ScorePanel({
  score,
  streak,
  halalCount,
  halalTotal,
  haramCount,
  haramTotal,
  mushCount,
  mushTotal,
  earnedBadges,
  locale,
}: ScorePanelProps) {
  return (
    <section className="card space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-extrabold">
          {locale === 'ar' ? 'التقدم' : 'Progress'}
        </h2>
        <div className="flex gap-2 text-sm">
          <span className="rounded-full bg-sun-300 px-2 py-0.5 font-extrabold">⭐ {score}</span>
          <span className="rounded-full bg-coral-300 px-2 py-0.5 font-extrabold">🔥 {streak}</span>
        </div>
      </div>

      <ProgressBar
        label={locale === 'ar' ? 'حلال وُجد' : 'Halal found'}
        value={halalCount}
        total={halalTotal}
        color="bg-sage-600"
      />
      <ProgressBar
        label={locale === 'ar' ? 'حرام تجنبناه' : 'Haram avoided'}
        value={haramCount}
        total={haramTotal}
        color="bg-coral-600"
      />
      <ProgressBar
        label={locale === 'ar' ? 'سألنا الأهل' : 'Asked Mom/Dad'}
        value={mushCount}
        total={mushTotal}
        color="bg-sun-500"
      />

      <div className="rounded-2xl bg-sun-100 p-3">
        <div className="mb-1 text-sm font-extrabold">
          {locale === 'ar' ? 'الشارات' : 'Badges'}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {BADGES.map((b) => {
            const earned = earnedBadges.has(b.type);
            return (
              <div
                key={b.type}
                className={`rounded-full bg-white px-2 py-0.5 text-xs font-bold shadow-sm ${
                  earned ? '' : 'opacity-40 grayscale'
                }`}
                title={b.name[locale]}
              >
                {earned ? `${b.emoji} ${b.name[locale]}` : `🔒 ${b.name[locale]}`}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProgressBar({ label, value, total, color }: { label: string; value: number; total: number; color: string }) {
  const pct = Math.min(100, (value / total) * 100);
  return (
    <div>
      <div className="mb-1 flex justify-between text-sm font-semibold">
        <span>{label}</span>
        <span>
          {value}/{total}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-sky-50">
        <div className={`h-full ${color} transition-all`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
