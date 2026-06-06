import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Adventure Map',
  description: 'Explore NoorQuest zones: Halal Market, Salah Oasis, Story Grove, and your Noor Tree.',
  robots: { index: false, follow: false },
};

export default function KidLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
