import Link from "next/link";

const footerLinks = {
  Product: [
    "AI Data Analyzer",
    "Smart Recommendations",
    "Auto Tagging",
    "Content Generator",
    "Dashboard",
    "Integrations",
  ],
  Company: ["About us", "Pricing", "Blog", "Careers", "Press kit", "Contact"],
  Developers: [
    "Documentation",
    "API Reference",
    "Changelog",
    "Status page",
    "Open source",
    "Support",
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#080f1e] border-t border-emerald-500/10 relative overflow-hidden">
      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

      {/* Main grid */}
      <div className="grid grid-cols-4 gap-10 px-10 py-12 border-b border-white/5">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-700 rounded-lg flex-shrink-0" />
            <span className="font-syne text-[17px] font-bold text-white">
              Eco<span className="text-emerald-400">Track</span>
            </span>
          </div>
          <p className="text-sm text-slate-400 font-light leading-relaxed max-w-[260px] mb-5">
            Enterprise AI platform for modern supply chain management. Automate
            inventory, eliminate stockouts, and grow smarter.
          </p>
          <div className="flex gap-2">
            {[
              { icon: "ti-brand-twitter", label: "Twitter" },
              { icon: "ti-brand-linkedin", label: "LinkedIn" },
              { icon: "ti-brand-github", label: "GitHub" },
              { icon: "ti-brand-youtube", label: "YouTube" },
            ].map((s) => (
              <Link
                key={s.label}
                href="#"
                aria-label={s.label}
                className="w-[34px] h-[34px] rounded-lg border border-white/9 text-slate-400
                  flex items-center justify-center hover:border-emerald-500/40
                  hover:text-emerald-400 hover:bg-emerald-500/10 transition-all"
              >
                <i className={`ti ${s.icon} text-[16px]`} aria-hidden="true" />
              </Link>
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
                <li key={link}>
                  <Link
                    href="#"
                    className="text-[13px] text-slate-400 hover:text-white font-light transition-colors"
                  >
                    {link}
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
            Get weekly AI insights, feature updates, and supply chain tips.
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
            Subscribe →
          </button>
        </div>
      </div>

      {/* Trust bar */}
      <div className="flex items-center gap-4 px-10 py-4 border-b border-white/5 flex-wrap">
        <div className="flex items-center gap-2 text-xs text-slate-400 bg-white/3 border border-white/7 rounded-full px-3 py-1">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          All systems operational
        </div>
        {[
          { icon: "ti-shield-check", text: "SOC 2 Type II" },
          { icon: "ti-lock", text: "GDPR compliant" },
          { icon: "ti-server", text: "99.9% uptime SLA" },
          { icon: "ti-cpu", text: "Powered by Gemini AI" },
        ].map((t) => (
          <div
            key={t.text}
            className="flex items-center gap-1.5 text-xs text-slate-500"
          >
            <i
              className={`ti ${t.icon} text-emerald-400 text-sm`}
              aria-hidden="true"
            />
            {t.text}
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between px-10 py-4 flex-wrap gap-3">
        <p className="text-xs text-slate-500 font-light">
          © 2025 <span className="text-emerald-400">EcoTrack</span>. Built with
          Next.js, Prisma & Gemini AI.
        </p>
        <div className="flex gap-6">
          {[
            "Privacy policy",
            "Terms of service",
            "Cookie settings",
            "Sitemap",
          ].map((l) => (
            <Link
              key={l}
              href="#"
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              {l}
            </Link>
          ))}
        </div>
        <div className="flex gap-2">
          {["Next.js", "Prisma", "PostgreSQL", "Gemini AI"].map((t) => (
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
