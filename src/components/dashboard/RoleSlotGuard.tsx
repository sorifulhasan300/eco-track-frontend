"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { USER_ROLES } from "@/types/roles";

interface RoleSlotGuardProps {
  allowedRole: USER_ROLES;
  children: React.ReactNode;
}

export default function RoleSlotGuard({ allowedRole, children }: RoleSlotGuardProps) {
  const router = useRouter();
  const role = useAuthStore((s) => s.user?.role);
  const isLoading = useAuthStore((s) => s.isLoading);

  useEffect(() => {
    if (!isLoading && role && role !== allowedRole) {
      router.replace("/dashboard");
    }
  }, [isLoading, role, allowedRole, router]);

  if (isLoading || !role) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  if (role !== allowedRole) {
    return null;
  }

  return <>{children}</>;
}
