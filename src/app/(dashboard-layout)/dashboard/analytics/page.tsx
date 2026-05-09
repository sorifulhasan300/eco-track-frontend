"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { USER_ROLES } from "@/types/roles";
import { Skeleton } from "@/components/ui/skeleton";
import AdminAnalyticsPage from "@/components/dashboard/analytics/AdminAnalytics";
import ManagerAnalytics from "@/components/dashboard/analytics/ManagerAnalytics";
import StaffAnalytics from "@/components/dashboard/analytics/StaffAnalytics";

export default function DashboardHomePage() {
  const user = useAuthStore((s) => s.user);

  if (!user) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-64 bg-emerald-500/10" />
        <Skeleton className="h-32 w-full bg-emerald-500/10" />
      </div>
    );
  }

  if (user.role === USER_ROLES.ADMIN) {
    return <AdminAnalyticsPage />;
  }
  if (user.role === USER_ROLES.MANAGER) {
    return <ManagerAnalytics />;
  }
  if (user.role === USER_ROLES.STAFF) {
    return <StaffAnalytics />;
  }

  return null;
}
