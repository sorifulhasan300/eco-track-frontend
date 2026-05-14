"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import EcoTrackLogo from "./EcoTrackLogo";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "AI Features", href: "/ai-features" },
  { label: "Platform", href: "/platform" },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAuthenticated, isLoading, initialize, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    initialize();
  }, [initialize]);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    setDrawerOpen(false);
    router.push("/");
  };

  return (
    <nav
      className="sticky top-0 z-50 h-16 flex items-center justify-between px-4 md:px-8
      bg-slate-950/90 backdrop-blur-xl border-b border-emerald-500/10"
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5">
        <EcoTrackLogo size={32} />
        <span className="font-bold text-lg tracking-tight text-white font-syne">
          Eco<span className="text-emerald-400">Track</span>
        </span>
      </Link>

      {/* Desktop Links */}
      <ul className="hidden md:flex items-center gap-1">
        {navItems.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className={`px-3 py-1.5 rounded-md text-sm transition-all ${
                pathname === item.href
                  ? "text-emerald-400 bg-emerald-500/10"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Desktop Right */}
      <div className="hidden md:flex items-center gap-2.5">
        <div
          className="flex items-center gap-1.5 text-xs text-slate-400
          border border-white/7 rounded-md px-2.5 py-1"
        >
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          All systems online
        </div>

        {isLoading ? (
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-20 animate-pulse rounded-lg bg-white/10" />
            <div className="h-8 w-28 animate-pulse rounded-lg bg-emerald-500/20" />
          </div>
        ) : isAuthenticated && user ? (
          <div className="relative">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex items-center gap-2 rounded-lg border border-white/10
                bg-white/5 px-3 py-1.5 text-sm text-white hover:bg-white/10 transition-all"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 font-semibold text-xs">
                {user.name?.charAt(0)?.toUpperCase() ||
                  user.email.charAt(0).toUpperCase()}
              </div>
              <span className="max-w-[120px] truncate">{user.name || user.email}</span>
              <svg
                className={`h-4 w-4 text-slate-400 transition-transform ${menuOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-white/10 bg-[#0f172a] shadow-xl overflow-hidden">
                <div className="px-4 py-3 border-b border-white/5">
                  <p className="text-sm font-medium text-white truncate">{user.name || user.email}</p>
                  <p className="text-xs text-slate-400 truncate">{user.email}</p>
                </div>
                <Link
                  href="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5 hover:text-red-300 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link
              href="/login"
              className="text-slate-300 text-sm border border-white/10
                rounded-lg px-4 py-1.5 hover:bg-white/5 transition-all"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm
                font-medium rounded-lg px-4 py-1.5 transition-all"
            >
              Get Started →
            </Link>
          </>
        )}
      </div>

      {/* Mobile Hamburger */}
      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetTrigger asChild>
          <button
            className="md:hidden inline-flex items-center justify-center rounded-lg border border-white/10
              bg-white/5 p-2 text-white hover:bg-white/10 transition-all"
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-[300px] sm:w-[340px] bg-[#0b1120] border-white/10 p-0"
        >
          <SheetHeader className="px-5 py-4 border-b border-white/10">
            <SheetTitle className="flex items-center gap-2.5 text-white">
              <EcoTrackLogo size={28} />
              <span className="font-bold text-lg tracking-tight font-syne">
                Eco<span className="text-emerald-400">Track</span>
              </span>
            </SheetTitle>
          </SheetHeader>

          <div className="flex flex-col h-[calc(100%-73px)]">
            <div className="flex-1 overflow-y-auto py-4 px-3">
              <ul className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <SheetClose asChild>
                      <Link
                        href={item.href}
                        className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                          pathname === item.href
                            ? "text-emerald-400 bg-emerald-500/10"
                            : "text-slate-300 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  </li>
                ))}
              </ul>

              <div className="mt-4 px-3 flex items-center gap-1.5 text-xs text-slate-400">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                All systems online
              </div>
            </div>

            <div className="border-t border-white/10 p-4">
              {isLoading ? (
                <div className="flex flex-col gap-2">
                  <div className="h-10 animate-pulse rounded-lg bg-white/10" />
                  <div className="h-10 animate-pulse rounded-lg bg-emerald-500/20" />
                </div>
              ) : isAuthenticated && user ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 px-1">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 font-semibold text-sm">
                      {user.name?.charAt(0)?.toUpperCase() ||
                        user.email.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-medium text-white truncate">
                        {user.name || user.email}
                      </span>
                      <span className="text-xs text-slate-400 truncate">
                        {user.email}
                      </span>
                    </div>
                  </div>
                  <SheetClose asChild>
                    <Link
                      href="/dashboard"
                      className="flex items-center justify-center w-full rounded-lg border border-white/10
                        bg-white/5 px-4 py-2.5 text-sm text-white hover:bg-white/10 transition-all"
                    >
                      Dashboard
                    </Link>
                  </SheetClose>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center w-full rounded-lg px-4 py-2.5 text-sm
                      text-red-400 bg-red-500/10 hover:bg-red-500/20 transition-all"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2.5">
                  <SheetClose asChild>
                    <Link
                      href="/login"
                      className="flex items-center justify-center w-full rounded-lg border border-white/10
                        px-4 py-2.5 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-all"
                    >
                      Sign in
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/register"
                      className="flex items-center justify-center w-full rounded-lg bg-emerald-500
                        hover:bg-emerald-600 text-white text-sm font-medium px-4 py-2.5 transition-all"
                    >
                      Get Started →
                    </Link>
                  </SheetClose>
                </div>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
