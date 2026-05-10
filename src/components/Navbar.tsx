"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export default function Navbar() {
  const [aiOpen, setAiOpen] = useState(false);
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
    router.push("/");
  };

  return (
    <nav
      className="sticky top-0 z-50 h-16 flex items-center justify-between px-8
      bg-slate-950/90 backdrop-blur-xl border-b border-emerald-500/10"
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5">
        <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-700 rounded-lg" />
        <span className="font-bold text-lg tracking-tight text-white font-syne">
          Eco<span className="text-emerald-400">Track</span>
        </span>
      </Link>

      {/* Links */}
      <ul className="flex items-center gap-1">
        {[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: "AI Features", href: "/ai-features" },
          { label: "Platform", href: "#" },
          { label: "Pricing", href: "/pricing" },
          { label: "Docs", href: "#" },
        ].map((item) => (
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

      {/* Right */}
      <div className="flex items-center gap-2.5">
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
    </nav>
  );
}
