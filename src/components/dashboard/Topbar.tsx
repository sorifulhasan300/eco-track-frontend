"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { LogOut, Bell, User } from "lucide-react";

interface TopbarProps {
  userName?: string;
  userEmail?: string;
}

export default function Topbar({ userName, userEmail }: TopbarProps) {
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <header className="sticky top-0 z-30 h-16 flex items-center justify-between px-6 bg-slate-950/90 backdrop-blur-xl border-b border-emerald-500/10">
      <div className="flex items-center gap-3">
        <h1 className="text-base font-semibold text-white font-syne">
          Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="relative text-slate-400 hover:text-white hover:bg-white/5"
        >
          <Bell className="size-4" />
          <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-emerald-500 ring-2 ring-slate-950" />
        </Button>

        <div className="hidden sm:flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
            <User className="size-3.5" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-sm text-white font-medium">{userName || "User"}</span>
            {userEmail && (
              <span className="text-xs text-slate-400">{userEmail}</span>
            )}
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleLogout}
          className="text-slate-400 hover:text-red-400 hover:bg-red-500/10"
          title="Logout"
        >
          <LogOut className="size-4" />
        </Button>
      </div>
    </header>
  );
}
