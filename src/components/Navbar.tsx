"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [aiOpen, setAiOpen] = useState(false);

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
        {["Home", "AI Features", "Platform", "Pricing", "Docs"].map((item) => (
          <li key={item}>
            <Link
              href="#"
              className="text-slate-400 hover:text-white hover:bg-white/5
                px-3 py-1.5 rounded-md text-sm transition-all"
            >
              {item}
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
      </div>
    </nav>
  );
}
