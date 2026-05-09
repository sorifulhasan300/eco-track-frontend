"use client";
import { useState } from "react";
import Link from "next/link";

const features = {
  basic: {
    included: ["Up to 500 products", "Basic inventory tracking", "CSV import & export", "1 user (Staff role)"],
    excluded: ["AI analytics", "Smart recommendations", "Auto tagging"],
  },
  pro: {
    included: ["Unlimited products", "AI Data Analyzer", "Smart Recommendations",
      "Auto Tagging & Classification", "AI Content Generator",
      "Up to 5 users (Admin + Manager)", "Redis caching & fast dashboard"],
    excluded: [],
  },
  enterprise: {
    included: ["Everything in Pro", "BullMQ background AI jobs", "Dedicated infrastructure",
      "Unlimited users & roles", "SLA + 99.9% uptime guarantee",
      "Custom AI model fine-tuning", "Dedicated account manager"],
    excluded: [],
  },
};

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section className="bg-[#080f1e] py-24 px-10">
      <div className="text-center flex flex-col items-center mb-12">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-medium px-4 py-2 rounded-full mb-4">
          <i className="ti ti-currency-taka text-sm" aria-hidden="true" />
          Pricing
        </div>
        <h2 className="font-syne text-4xl font-extrabold text-white tracking-tight mb-3">
          Simple, <span className="text-emerald-400">transparent pricing</span>
        </h2>
        <p className="text-sm text-slate-400 font-light">
          No hidden fees. Cancel anytime. Start free, scale when ready.
        </p>

        {/* Toggle */}
        <div className="flex items-center gap-3 mt-6">
          <span className={`text-sm transition-colors ${!yearly ? "text-white font-medium" : "text-slate-400"}`}>Monthly</span>
          <button
            onClick={() => setYearly(!yearly)}
            className="relative w-11 h-6 bg-emerald-500 rounded-full transition-all"
            aria-label="Toggle billing"
          >
            <div className={`absolute top-[3px] left-[3px] w-[18px] h-[18px] bg-white rounded-full transition-transform duration-250 ${yearly ? "translate-x-5" : ""}`} />
          </button>
          <span className={`text-sm transition-colors ${yearly ? "text-white font-medium" : "text-slate-400"}`}>Yearly</span>
          {yearly && (
            <span className="text-[11px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-0.5 rounded-full font-medium">
              Save 17%
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5 max-w-4xl mx-auto">

        {/* Basic */}
        <div className="bg-slate-900 border border-white/8 rounded-2xl p-7 flex flex-col hover:-translate-y-1 transition-transform duration-250">
          <div className="w-10 h-10 rounded-xl bg-slate-400/10 border border-slate-400/20 flex items-center justify-center text-slate-400 mb-5">
            <i className="ti ti-box text-xl" aria-hidden="true" />
          </div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Basic</div>
          <div className="text-[12.5px] text-slate-500 font-light leading-relaxed mb-5">For small teams getting started with inventory.</div>
          <div className="font-syne text-4xl font-extrabold text-white mb-0.5">৳0</div>
          <div className="text-xs text-slate-500 mb-5">Free forever</div>
          <div className="h-px bg-white/7 mb-5" />
          <ul className="flex-1 space-y-2.5 mb-6 text-[12.5px]">
            {features.basic.included.map(f => (
              <li key={f} className="flex items-start gap-2 text-slate-300 font-light">
                <i className="ti ti-check text-emerald-400 text-sm mt-0.5 flex-shrink-0" aria-hidden="true" />{f}
              </li>
            ))}
            {features.basic.excluded.map(f => (
              <li key={f} className="flex items-start gap-2 text-slate-600 font-light">
                <i className="ti ti-x text-slate-600 text-sm mt-0.5 flex-shrink-0" aria-hidden="true" />{f}
              </li>
            ))}
          </ul>
          <Link href="/register" className="block w-full py-2.5 text-center text-[13.5px] font-medium text-slate-300 border border-white/12 rounded-xl hover:bg-white/7 hover:text-white transition-all">
            Get started free
          </Link>
        </div>

        {/* Pro */}
        <div className="relative bg-gradient-to-b from-emerald-500/7 to-slate-900 border-2 border-emerald-500 rounded-2xl p-7 flex flex-col hover:-translate-y-1 transition-transform duration-250">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
          <span className="absolute top-5 right-5 text-[10.5px] font-semibold text-white bg-emerald-500 px-2.5 py-0.5 rounded-full">Most popular</span>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 mb-5">
            <i className="ti ti-cpu text-xl" aria-hidden="true" />
          </div>
          <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1">Pro</div>
          <div className="text-[12.5px] text-slate-500 font-light leading-relaxed mb-5">Full AI power for growing supply chains.</div>
          <div className="font-syne text-4xl font-extrabold text-emerald-400 mb-0.5">
            ৳{yearly ? "10,000" : "1,000"}
          </div>
          <div className="text-xs text-slate-500 mb-0.5">{yearly ? "per year" : "per month"}</div>
          {yearly && <div className="text-[11.5px] text-emerald-400 mb-4">You save ৳2,000 vs monthly</div>}
          {!yearly && <div className="mb-4" />}
          <div className="h-px bg-white/7 mb-5" />
          <ul className="flex-1 space-y-2.5 mb-6 text-[12.5px]">
            {features.pro.included.map(f => (
              <li key={f} className="flex items-start gap-2 text-slate-300 font-light">
                <i className="ti ti-check text-emerald-400 text-sm mt-0.5 flex-shrink-0" aria-hidden="true" />{f}
              </li>
            ))}
          </ul>
          <Link href="/register" className="block w-full py-2.5 text-center text-[13.5px] font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-xl transition-all hover:-translate-y-0.5">
            Start Pro plan
          </Link>
        </div>

        {/* Enterprise */}
        <div className="bg-slate-900 border border-white/8 rounded-2xl p-7 flex flex-col hover:-translate-y-1 transition-transform duration-250">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-400 mb-5">
            <i className="ti ti-building text-xl" aria-hidden="true" />
          </div>
          <div className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-1">Enterprise</div>
          <div className="text-[12.5px] text-slate-500 font-light leading-relaxed mb-5">Custom solutions for large-scale operations.</div>
          <div className="font-syne text-4xl font-extrabold text-purple-400 mb-0.5">Custom</div>
          <div className="text-xs text-slate-500 mb-5">contact us</div>
          <div className="h-px bg-white/7 mb-5" />
          <ul className="flex-1 space-y-2.5 mb-6 text-[12.5px]">
            {features.enterprise.included.map(f => (
              <li key={f} className="flex items-start gap-2 text-slate-300 font-light">
                <i className="ti ti-check text-emerald-400 text-sm mt-0.5 flex-shrink-0" aria-hidden="true" />{f}
              </li>
            ))}
          </ul>
          <Link href="/contact" className="block w-full py-2.5 text-center text-[13.5px] font-medium text-purple-400 border border-purple-500/40 rounded-xl hover:bg-purple-500/10 transition-all">
            Contact sales
          </Link>
        </div>

      </div>

      {/* Guarantee */}
      <div className="flex items-center justify-center gap-2 mt-8 text-xs text-slate-500">
        <i className="ti ti-shield-check text-emerald-400 text-sm" aria-hidden="true" />
        30-day money-back guarantee
        <span className="mx-1">·</span>
        <i className="ti ti-lock text-emerald-400 text-sm" aria-hidden="true" />
        No credit card required for Basic
      </div>
    </section>
  );
}