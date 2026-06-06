import { getTranslations, setRequestLocale } from 'next-intl/server';
import { LumiSpeech } from '@/components/kid/LumiSpeech';

export default async function MapPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations('Map');
  return (
    <main className="mx-auto max-w-4xl px-4 pb-8">
      <LumiSpeech
        size={80}
        pose="happy"
        lines={[t('lumi_line'), t('lumi_line_2')]}
        className="py-4"
      />
      <h1 className="mb-2 text-center text-3xl font-extrabold">{t('title')}</h1>
      <p className="mb-6 text-center text-ink/60">{t('sub')}</p>
      <MapZones
        market={t('zone_market')}
        marketSub={t('zone_market_sub')}
        oasis={t('zone_oasis')}
        oasisSub={t('zone_oasis_sub')}
        grove={t('zone_grove')}
        groveSub={t('zone_grove_sub')}
        tree={t('zone_tree')}
        treeSub={t('zone_tree_sub')}
        gallery={t('zone_gallery')}
        locked={t('zone_locked')}
        daily={t('zone_daily')}
        locked2={t('zone_locked2')}
      />
    </main>
  );
}

function MapZones(p: {
  market: string; marketSub: string;
  oasis: string; oasisSub: string;
  grove: string; groveSub: string;
  tree: string; treeSub: string;
  gallery: string; locked: string;
  daily: string; locked2: string;
}) {
  const zones = [
    { href: '/market', emoji: '🛒', title: p.market, sub: p.marketSub, gradient: 'from-sage-300 to-sage-600', locked: false },
    { href: '/salah',   emoji: '🕌', title: p.oasis,  sub: p.oasisSub,  gradient: 'from-sky-300 to-sky-600',   locked: false },
    { href: '/stories', emoji: '📖', title: p.grove,  sub: p.groveSub,  gradient: 'from-sun-300 to-sun-500',   locked: false },
    { href: '/tree',    emoji: '🌳', title: p.tree,   sub: p.treeSub,   gradient: 'from-coral-300 to-coral-600', locked: false },
    { href: '#',        emoji: '🎨', title: p.gallery,sub: p.locked,    gradient: 'from-gray-300 to-gray-400',  locked: true  },
    { href: '#',        emoji: '⭐', title: p.daily,  sub: p.locked2,   gradient: 'from-gray-300 to-gray-400',  locked: true  },
  ];
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {zones.map((z) => (
        <a
          key={z.href}
          href={z.locked ? undefined : z.href}
          className={`block ${z.locked ? 'cursor-not-allowed' : 'hover:-translate-y-1 hover:scale-[1.02]'} transition-transform`}
        >
          <div
            className={`card aspect-square bg-gradient-to-br ${z.gradient} !p-5 text-white ${
              z.locked ? 'grayscale opacity-60' : ''
            }`}
          >
            <div className="flex h-full flex-col justify-between text-white">
              <div className="text-5xl">{z.emoji}</div>
              <div>
                <div className="text-xl font-extrabold">{z.title}</div>
                <div className="text-sm opacity-90">{z.sub}</div>
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
