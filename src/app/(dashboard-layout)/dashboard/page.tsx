'use client'
import { redirect } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { USER_ROLES } from "@/types/roles";

export default function Dashboard() {
  const userRole = useAuthStore((s) => s.user?.role);
  if (userRole === USER_ROLES.ADMIN) {
    return redirect("/dashboard/analytics");
  }
  if (userRole === USER_ROLES.MANAGER) {
    return redirect("/dashboard/manager-analytics");
  }
  if (userRole === USER_ROLES.STAFF) {
    return redirect("/dashboard/my-orders");
  }
  return redirect("/");
}
