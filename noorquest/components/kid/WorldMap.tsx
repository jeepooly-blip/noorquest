'use client';

import { Link } from '@/lib/i18n/navigation';

interface Zone {
  href: string;
  emoji: string;
  titleKey: 'zone_market' | 'zone_oasis' | 'zone_grove' | 'zone_tree' | 'zone_gallery' | 'zone_daily';
  subKey: 'zone_market_sub' | 'zone_oasis_sub' | 'zone_grove_sub' | 'zone_tree_sub' | 'zone_locked' | 'zone_locked2';
  gradient: string;
  locked: boolean;
}

const ZONES: Zone[] = [
  { href: '/market', emoji: '🛒', titleKey: 'zone_market', subKey: 'zone_market_sub', gradient: 'from-sage-300 to-sage-600', locked: false },
  { href: '/salah',   emoji: '🕌', titleKey: 'zone_oasis',  subKey: 'zone_oasis_sub',  gradient: 'from-sky-300 to-sky-600',   locked: false },
  { href: '/stories', emoji: '📖', titleKey: 'zone_grove',  subKey: 'zone_grove_sub',  gradient: 'from-sun-300 to-sun-500',   locked: false },
  { href: '/tree',    emoji: '🌳', titleKey: 'zone_tree',   subKey: 'zone_tree_sub',   gradient: 'from-coral-300 to-coral-600', locked: false },
  { href: '/gallery', emoji: '🎨', titleKey: 'zone_gallery',subKey: 'zone_locked',     gradient: 'from-gray-300 to-gray-400',  locked: true  },
  { href: '/daily',   emoji: '⭐', titleKey: 'zone_daily',  subKey: 'zone_locked2',    gradient: 'from-gray-300 to-gray-400',  locked: true  },
];

interface WorldMapProps {
  t: (key: string) => string;
}

export function WorldMap({ t }: WorldMapProps) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {ZONES.map((z) => {
        const card = (
          <div
            className={`zone-card card aspect-square bg-gradient-to-br ${z.gradient} !p-5 text-white ${
              z.locked ? 'cursor-not-allowed grayscale opacity-60' : 'hover:-translate-y-1 hover:scale-[1.02]'
            }`}
          >
            <div className="flex h-full flex-col justify-between text-white">
              <div className="text-5xl" aria-hidden="true">{z.emoji}</div>
              <div>
                <div className="text-xl font-extrabold">{t(`Map.${z.titleKey}`)}</div>
                <div className="text-sm opacity-90">{t(`Map.${z.subKey}`)}</div>
              </div>
            </div>
          </div>
        );
        return z.locked ? (
          <div key={z.href}>{card}</div>
        ) : (
          <Link key={z.href} href={z.href as '/market'} className="block">
            {card}
          </Link>
        );
      })}
    </div>
  );
}
