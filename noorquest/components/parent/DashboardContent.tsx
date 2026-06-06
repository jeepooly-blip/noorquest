'use client';

import { useTranslations } from 'next-intl';

export function ParentDashboardContent() {
  return (
    <div>
      <h1 className="mb-2 text-3xl font-extrabold">Assalamu alaikum, Ahmed 👋</h1>
      <p className="mb-6 text-sm text-neutral-700">Here's how your children are doing this week.</p>
      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          { e: '⏱️', v: '2h 15m', l: 'This week' },
          { e: '⭐', v: '12', l: 'Badges' },
          { e: '🔥', v: '5 days', l: 'Streak' },
          { e: '📖', v: '3', l: 'Stories' },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl border border-neutral-200 bg-white p-4">
            <div className="mb-1 text-3xl">{s.e}</div>
            <div className="text-2xl font-extrabold">{s.v}</div>
            <div className="text-xs text-neutral-700">{s.l}</div>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-neutral-200 bg-white p-5">
        <h2 className="mb-3 text-xl font-extrabold">Your children</h2>
        <div className="space-y-3 text-sm">
          <ChildRow name="Aisha" age={7} level={3} pct={60} />
          <ChildRow name="Yusuf" age={6} level={1} pct={25} />
        </div>
      </div>
      <p className="mt-4 text-xs text-neutral-500">
        Full dashboard with charts and resources — see <a href="/prototypes/parent-dashboard.html" className="text-sky-600 underline">prototype</a>.
      </p>
    </div>
  );
}

function ChildRow({ name, age, level, pct }: { name: string; age: number; level: number; pct: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-sun-300 to-sun-500 text-xl">
        {age >= 7 ? '👧' : '👦'}
      </div>
      <div className="flex-1">
        <div className="font-bold">
          {name} ({age}) — Level {level}
        </div>
        <div className="mt-1 h-2 rounded-full bg-neutral-200">
          <div className="h-full rounded-full bg-sage-600" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  );
}
