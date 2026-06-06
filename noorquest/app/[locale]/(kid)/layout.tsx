import { Link } from '@/lib/i18n/navigation';
import { LumiMascot } from '@/components/kid/LumiMascot';

export default function KidLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-cream">
      <header className="sticky top-0 z-20 flex items-center gap-3 bg-white px-4 py-3 shadow-sm">
        <Link href="/" className="text-2xl" aria-label="Home">🏠</Link>
        <LumiMascot size={40} />
        <div className="flex-1">
          <div className="text-xs text-ink/60">Aisha's Noor Tree</div>
          <div className="h-3 overflow-hidden rounded-full bg-sky-50">
            <div className="h-full w-[42%] bg-gradient-to-r from-sage-300 to-sage-600" />
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-ink/60">Level 3</div>
          <div className="text-sm font-bold text-sun-500">⭐ 240 XP</div>
        </div>
      </header>
      {children}
    </div>
  );
}
