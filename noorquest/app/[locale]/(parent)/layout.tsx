import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Parent Dashboard',
  description: 'See your child’s learning progress, time-on-app, and scholar-approved content controls.',
};

export default function ParentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
