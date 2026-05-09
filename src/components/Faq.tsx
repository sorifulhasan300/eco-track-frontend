"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What AI model does EcoTrack use under the hood?",
    a: "EcoTrack is powered by Google's Gemini 1.5 Flash model for all AI features — including product tagging, business analytics, smart recommendations, and content generation. We chose Gemini for its speed, accuracy, and cost efficiency at scale.",
  },
  {
    q: "Can I import my existing product catalogue?",
    a: "Yes. EcoTrack supports bulk CSV import, direct REST API ingestion, and manual entry. Once your products are uploaded, the AI auto-classifier runs within seconds to tag and categorise everything automatically — no manual work needed.",
  },
  {
    q: "How does role-based access work?",
    a: "EcoTrack has three built-in roles: Admin, Manager, and Staff. Admins see full analytics and user management. Managers handle inventory tracking and AI reports. Staff handle daily sales entry and stock updates. Each role has a dedicated dashboard and restricted API access.",
  },
  {
    q: "Is my data secure? Where is it stored?",
    a: "All data is stored in a PostgreSQL database with encrypted connections. We are SOC 2 Type II compliant and GDPR ready. Sensitive fields are hashed and API endpoints are protected with JWT authentication and rate limiting on all AI routes.",
  },
  {
    q: "What happens when stock falls below the threshold?",
    a: "EcoTrack triggers an automatic low-stock alert on your dashboard and optionally sends a notification to assigned managers. The AI then analyzes your supplier list and suggests the best vendor based on price history, delivery time, and current ratings — ready for one-click ordering.",
  },
  {
    q: "Can I try EcoTrack before paying?",
    a: "Yes — the Basic plan is free forever with up to 500 products and core inventory features. You can upgrade to Pro or Enterprise any time to unlock AI analytics, BullMQ background jobs, Redis caching, and unlimited products.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-[#080f1e] py-24 px-10">
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-medium px-4 py-2 rounded-full mb-4">
          <i className="ti ti-help-circle text-sm" aria-hidden="true" />
          FAQ
        </div>
        <h2 className="font-syne text-4xl font-extrabold text-white tracking-tight mb-3">
          Common <span className="text-emerald-400">questions answered</span>
        </h2>
        <p className="text-sm text-slate-400 font-light max-w-sm mx-auto">
          Everything you need to know before getting started with EcoTrack.
        </p>
      </div>

      <div className="max-w-6xl mx-auto space-y-2.5">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className={`border rounded-xl overflow-hidden transition-colors duration-200 ${
              open === i ? "border-emerald-500/25" : "border-white/7"
            }`}
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-transparent cursor-pointer"
            >
              <span className="text-[14px] font-medium text-white">{faq.q}</span>
              <span
                className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 border transition-all duration-200 ${
                  open === i
                    ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-400"
                    : "bg-white/5 border-white/10 text-slate-400"
                }`}
              >
                <i
                  className="ti ti-plus text-sm transition-transform duration-250"
                  style={{ transform: open === i ? "rotate(45deg)" : "rotate(0deg)" }}
                  aria-hidden="true"
                />
              </span>
            </button>

            <div
              className="overflow-hidden transition-all duration-300"
              style={{ maxHeight: open === i ? "200px" : "0px" }}
            >
              <p className="px-5 pb-4 text-[13px] text-slate-400 leading-relaxed font-light border-t border-white/5 pt-3">
                {faq.a}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}