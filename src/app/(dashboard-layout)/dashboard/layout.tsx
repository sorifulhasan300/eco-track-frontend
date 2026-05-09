"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { USER_ROLES } from "@/types/roles";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

export default function DashboardLayout({
  children,
  admin,
  manager,
  staff,
}: {
  children: React.ReactNode;
  admin: React.ReactNode;
  manager: React.ReactNode;
  staff: React.ReactNode;
}) {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const isLoading = useAuthStore((s) => s.isLoading);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    if (!isLoading && isAuthenticated && user?.role) {
      const validRoles = Object.values(USER_ROLES);
      if (!validRoles.includes(user.role)) {
        router.replace("/login");
      }
    }
  }, [isLoading, isAuthenticated, user, router]);

  if (isLoading || !isAuthenticated || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080f1e]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  const role = user.role;

  return (
    <div className="flex min-h-screen bg-[#080f1e]">
      <Sidebar role={role} />

      <div className="flex flex-1 flex-col lg:ml-0">
        <Topbar userName={user.name || user.email} userEmail={user.email} />

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
