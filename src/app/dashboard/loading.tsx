'use client';

import { Loading } from '@/components/ui/Loading';

interface DashboardLoadingProps {
  message?: string;
}

export default function DashboardLoading({ message = "SYNCING_DASHBOARD_DATA" }: DashboardLoadingProps) {
  return <Loading message={message} />;
}