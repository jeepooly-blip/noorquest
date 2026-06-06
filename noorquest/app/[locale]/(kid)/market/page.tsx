'use client';

import { useState } from 'react';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { useTranslations } from 'next-intl';
import { LumiMascot } from '@/components/kid/LumiMascot';
import { FoodItem } from '@/components/kid/FoodItem';
import { ScannerZone } from '@/components/kid/ScannerZone';
import { ScorePanel } from '@/components/kid/ScorePanel';
import {
  HALAL_ITEMS,
  getItem,
  randomLineFor,
  type Category,
} from '@/lib/halal/items';

export default function MarketPage() {
  const t = useTranslations('Halal');
  const locale = (typeof document !== 'undefined' && document.documentElement.lang === 'ar' ? 'ar' : 'en') as 'en' | 'ar';

  const [used, setUsed] = useState<Set<string>>(new Set());
  const [flash, setFlash] = useState<Category | null>(null);
  const [currentEmoji, setCurrentEmoji] = useState<string | null>(null);
  const [lumiLine, setLumiLine] = useState<string>(t('lumi_intro'));
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [halalSet, setHalalSet] = useState<Set<string>>(new Set());
  const [haramSet, setHaramSet] = useState<Set<string>>(new Set());
  const [mushSet, setMushSet] = useState<Set<string>>(new Set());
  const [badges, setBadges] = useState<Set<string>>(new Set());

  const halalItems = HALAL_ITEMS.filter((i) => i.category === 'halal');
  const haramItems = HALAL_ITEMS.filter((i) => i.category === 'haram');
  const mushItems = HALAL_ITEMS.filter((i) => i.category === 'mushbooh');

  function onDragEnd(e: DragEndEvent) {
    const id = String(e.active.id);
    if (!e.over || e.over.id !== 'scanner') return;
    if (used.has(id)) return;

    const item = getItem(id);
    if (!item) return;

    setUsed((prev) => new Set(prev).add(id));
    setCurrentEmoji(item.emoji);
    setFlash(item.category);
    setLumiLine(randomLineFor(item.category, item.name[locale], locale));

    if (item.category === 'halal') {
      setHalalSet((p) => new Set(p).add(id));
      setScore((s) => s + 10);
      setStreak((s) => s + 1);
      if (streak + 1 === 3) award('on_fire');
      if (halalSet.size + 1 === 13) award('halal_hero');
    } else if (item.category === 'haram') {
      setHaramSet((p) => new Set(p).add(id));
      setStreak(0);
      if (haramSet.size + 1 === 4) award('smart_picker');
    } else {
      setMushSet((p) => new Set(p).add(id));
      setScore((s) => s + 5);
      if (mushSet.size + 1 === 3) award('asks_parents');
    }

    setTimeout(() => {
      setFlash(null);
      setCurrentEmoji(null);
    }, 1500);
  }

  function award(type: string) {
    setBadges((p) => new Set(p).add(type));
  }

  return (
    <DndContext onDragEnd={onDragEnd}>
      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-4 p-4 md:grid-cols-3">
        <section className="card md:col-span-1">
          <h2 className="mb-3 text-lg font-extrabold">{t('shelf')}</h2>
          <h3 className="mb-2 text-sm font-bold text-sage-600">Halal</h3>
          <div className="mb-4 grid grid-cols-3 gap-2">
            {halalItems.map((i) => (
              <FoodItem key={i.id} item={i} locale={locale} disabled={used.has(i.id)} />
            ))}
          </div>
          <h3 className="mb-2 text-sm font-bold text-coral-600">Haram</h3>
          <div className="mb-4 grid grid-cols-3 gap-2">
            {haramItems.map((i) => (
              <FoodItem key={i.id} item={i} locale={locale} disabled={used.has(i.id)} />
            ))}
          </div>
          <h3 className="mb-2 text-sm font-bold text-sun-500">Mushbooh</h3>
          <div className="grid grid-cols-3 gap-2">
            {mushItems.map((i) => (
              <FoodItem key={i.id} item={i} locale={locale} disabled={used.has(i.id)} />
            ))}
          </div>
        </section>

        <section className="card flex flex-col items-center md:col-span-1">
          <LumiMascot size={80} />
          <div className="my-3 flex min-h-12 items-center justify-center rounded-2xl bg-sky-50 px-3 py-2 text-center">
            <p className="text-sm font-semibold">{lumiLine}</p>
          </div>
          <ScannerZone flash={flash} currentEmoji={currentEmoji} />
        </section>

        <div className="md:col-span-1">
          <ScorePanel
            score={score}
            streak={streak}
            halalCount={halalSet.size}
            halalTotal={13}
            haramCount={haramSet.size}
            haramTotal={4}
            mushCount={mushSet.size}
            mushTotal={2}
            earnedBadges={badges}
            locale={locale}
          />
        </div>
      </main>
    </DndContext>
  );
}
