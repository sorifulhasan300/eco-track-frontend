"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { USER_ROLES } from "@/types/roles";
import { Skeleton } from "@/components/ui/skeleton";
import { redirect } from "next/navigation";

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

  const welcomeTitle = {
    [USER_ROLES.ADMIN]: "Admin Overview",
    [USER_ROLES.MANAGER]: "Manager Overview",
    [USER_ROLES.STAFF]: "My Dashboard",
  }[user.role];

  return (
    redirect("/dashboard/analytics")
  );
}
