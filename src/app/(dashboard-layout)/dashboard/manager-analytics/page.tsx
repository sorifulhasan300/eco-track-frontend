"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { USER_ROLES } from "@/types/roles";
import { Skeleton } from "@/components/ui/skeleton";
import ManagerAnalytics from "@/components/dashboard/analytics/ManagerAnalytics";

export default function ManagerAnalyticsPage() {
  const user = useAuthStore((s) => s.user);

  if (!user) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-64 bg-emerald-500/10" />
        <Skeleton className="h-32 w-full bg-emerald-500/10" />
      </div>
    );
  }

  if (user.role === USER_ROLES.MANAGER) {
    return <ManagerAnalytics />;
  }

  return null;
}
