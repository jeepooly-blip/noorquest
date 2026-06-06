import { Link } from '@/lib/i18n/navigation';

export default function ParentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-neutral-50">
      <aside className="hidden w-64 border-r border-neutral-200 bg-white p-4 md:block">
        <div className="mb-8 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-600 font-extrabold text-white">N</div>
          <span className="text-xl font-extrabold">NoorQuest</span>
        </div>
        <nav className="space-y-1 text-sm">
          <Link href="/dashboard" className="block rounded-lg bg-teal-50 px-3 py-2 font-semibold text-teal-600">
            📊 Dashboard
          </Link>
          <a className="block rounded-lg px-3 py-2 hover:bg-neutral-50" href="#">📚 Resources</a>
          <a className="block rounded-lg px-3 py-2 hover:bg-neutral-50" href="#">🖼️ Approvals</a>
          <a className="block rounded-lg px-3 py-2 hover:bg-neutral-50" href="#">⚙️ Settings</a>
          <Link href="/" className="mt-8 block rounded-lg px-3 py-2 hover:bg-neutral-50">← Home</Link>
        </nav>
      </aside>
      <main className="max-w-6xl flex-1 p-4 md:p-8">{children}</main>
    </div>
  );
}
