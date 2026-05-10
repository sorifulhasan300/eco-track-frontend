import Link from "next/link";
import EcoTrackLogo from "./EcoTrackLogo";
import { ShieldCheck, Lock, Server, Cpu } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "AI Features", href: "/ai-features" },
    { label: "Platform", href: "/platform" },
    { label: "Pricing", href: "/pricing" },
    { label: "Products", href: "/products" },
  ],
  Company: [
    { label: "Docs", href: "/docs" },
    { label: "Contact", href: "/contact" },
    { label: "Login", href: "/login" },
    { label: "Register", href: "/register" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
  ],
};

const socialLinks = [
  {
    label: "X",
    href: "https://x.com/hasan_soriful",
    svg: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/sorifulhasan300",
    svg: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sorifulhasan",
    svg: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

const trustBadges = [
  { icon: ShieldCheck, text: "SOC 2 Type II" },
  { icon: Lock, text: "GDPR compliant" },
  { icon: Server, text: "99.9% uptime SLA" },
  { icon: Cpu, text: "Powered by AI" },
];

export default function Footer() {
  return (
    <footer className="bg-[#080f1e] border-t border-emerald-500/10 relative overflow-hidden">
      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

      {/* Main grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-10 py-12 border-b border-white/5">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <EcoTrackLogo size={32} />
            <span className="font-syne text-[17px] font-bold text-white">
              Eco<span className="text-emerald-400">Track</span>
            </span>
          </div>
          <p className="text-sm text-slate-400 font-light leading-relaxed max-w-[260px] mb-5">
            AI-powered supply chain platform. Automate inventory, eliminate
            stockouts, and grow smarter.
          </p>
          <div className="flex gap-2">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-[34px] h-[34px] rounded-lg border border-white/9 text-slate-400
                  flex items-center justify-center hover:border-emerald-500/40
                  hover:text-emerald-400 hover:bg-emerald-500/10 transition-all"
              >
                {s.svg}
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className="text-[11.5px] font-medium text-slate-400 uppercase tracking-widest mb-4">
              {title}
            </h4>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-slate-400 hover:text-white font-light transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Newsletter */}
      <div className="flex items-center justify-between gap-8 px-10 py-5 border-b border-white/5 flex-wrap">
        <div>
          <h3 className="font-syne text-base font-bold text-white mb-1">
            Stay ahead of your inventory
          </h3>
          <p className="text-[13px] text-slate-400 font-light">
            Get weekly AI insights and supply chain tips.
          </p>
        </div>
        <div className="flex gap-2">
          <input
            type="email"
            placeholder="your@email.com"
            className="bg-white/5 border border-white/9 rounded-lg px-4 h-[38px] text-white
              text-[13px] outline-none focus:border-emerald-500/40 w-[220px] placeholder:text-slate-500
              font-light font-sans"
          />
          <button
            className="h-[38px] px-5 bg-emerald-500 hover:bg-emerald-600 text-white
            rounded-lg text-[13px] font-medium transition-all whitespace-nowrap"
          >
            Subscribe
          </button>
        </div>
      </div>

      {/* Trust bar */}
      <div className="flex items-center gap-4 px-10 py-4 border-b border-white/5 flex-wrap">
        <div className="flex items-center gap-2 text-xs text-slate-400 bg-white/3 border border-white/7 rounded-full px-3 py-1">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          All systems operational
        </div>
        {trustBadges.map((t) => (
          <div
            key={t.text}
            className="flex items-center gap-1.5 text-xs text-slate-500"
          >
            <t.icon className="h-3.5 w-3.5 text-emerald-400" />
            {t.text}
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between px-10 py-4 flex-wrap gap-3">
        <p className="text-xs text-slate-500 font-light">
          &copy; 2025 <span className="text-emerald-400">EcoTrack</span>. Built with
          Next.js, Prisma & AI.
        </p>
        <div className="flex gap-2">
          {["Next.js", "Prisma", "PostgreSQL", "AI"].map((t) => (
            <span
              key={t}
              className="text-[11px] text-slate-500 bg-white/4 border border-white/7 px-2 py-0.5 rounded"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
