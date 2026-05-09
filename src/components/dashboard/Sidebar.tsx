"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { USER_ROLES } from "@/types/roles";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Package,
  Users,
  BarChart3,
  Settings,
  FileText,
  UserCheck,
  ClipboardList,
  UserCircle,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
  roles: USER_ROLES[];
};

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.STAFF],
  },
  {
    label: "Product Manage",
    href: "/dashboard/products",
    icon: Package,
    roles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER],
  },
  {
    label: "User Management",
    href: "/dashboard/users",
    icon: Users,
    roles: [USER_ROLES.ADMIN],
  },
  {
    label: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
    roles: [USER_ROLES.ADMIN],
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    roles: [USER_ROLES.ADMIN],
  },
  {
    label: "Reports",
    href: "/dashboard/reports",
    icon: FileText,
    roles: [USER_ROLES.MANAGER],
  },
  {
    label: "Staff Performance",
    href: "/dashboard/staff-performance",
    icon: UserCheck,
    roles: [USER_ROLES.MANAGER],
  },
  {
    label: "My Tasks",
    href: "/dashboard/tasks",
    icon: ClipboardList,
    roles: [USER_ROLES.STAFF],
  },
  {
    label: "Profile",
    href: "/dashboard/profile",
    icon: UserCircle,
    roles: [USER_ROLES.STAFF],
  },
];

function getRoleLabel(role: USER_ROLES) {
  switch (role) {
    case USER_ROLES.ADMIN:
      return "Administrator";
    case USER_ROLES.MANAGER:
      return "Manager";
    case USER_ROLES.STAFF:
      return "Staff";
    default:
      return "User";
  }
}

interface SidebarProps {
  role: USER_ROLES;
}

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const filteredItems = navItems.filter((item) => item.roles.includes(role));

  return (
    <>
      {/* Mobile Toggle */}
      <div className="lg:hidden fixed top-0 left-0 z-50 w-full h-16 flex items-center justify-between px-4 bg-slate-950/90 backdrop-blur-xl border-b border-emerald-500/10">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-gradient-to-br from-emerald-400 to-emerald-700 rounded-lg" />
          <span className="font-bold text-base tracking-tight text-white font-syne">
            Eco<span className="text-emerald-400">Track</span>
          </span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileOpen((v) => !v)}
          className="text-slate-300 hover:text-white hover:bg-white/5"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 z-40 h-screen w-64 shrink-0",
          "bg-[#080f1e] border-r border-emerald-500/10",
          "transition-transform duration-300 ease-in-out",
          "lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center gap-2.5 border-b border-emerald-500/10 px-5">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-700 rounded-lg" />
            <span className="font-bold text-lg tracking-tight text-white font-syne">
              Eco<span className="text-emerald-400">Track</span>
            </span>
          </div>

          {/* Role Badge */}
          <div className="px-4 pt-4">
            <div className="rounded-md bg-emerald-500/10 border border-emerald-500/20 px-3 py-2">
              <p className="text-xs text-emerald-400 font-medium uppercase tracking-wider">
                {getRoleLabel(role)}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">Dashboard</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
            {filteredItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                    isActive
                      ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/20"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <Icon className="size-4 shrink-0" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="border-t border-emerald-500/10 px-4 py-3">
            <p className="text-[11px] text-slate-500">
              EcoTrack v1.0
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
