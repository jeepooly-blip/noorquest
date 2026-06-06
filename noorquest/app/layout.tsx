import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'NoorQuest',
  description: 'Bright Adventures in Faith for Little Hearts',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
