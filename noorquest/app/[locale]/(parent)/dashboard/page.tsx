import { setRequestLocale } from 'next-intl/server';
import { ParentDashboardContent } from '@/components/parent/DashboardContent';

export default function DashboardPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return <ParentDashboardContent />;
}
