"use client";

import Link from "next/link";
import {
  Boxes,
  Truck,
  ShoppingCart,
  BarChart3,
  ShieldCheck,
  Zap,
  Users,
  Globe,
  ArrowRight,
  Layers,
} from "lucide-react";

const modules = [
  {
    icon: Boxes,
    title: "Inventory Management",
    desc: "Track SKUs across multiple warehouses. Real-time stock levels, batch tracking, expiry alerts, and automated reorder triggers.",
  },
  {
    icon: Truck,
    title: "Supplier Hub",
    desc: "Centralize supplier profiles, rate them on reliability & cost, and compare quotes. AI recommends the best vendor for every reorder.",
  },
  {
    icon: ShoppingCart,
    title: "Order Processing",
    desc: "Create, approve, and fulfill purchase & sales orders. Status pipelines from draft to delivered with full audit trails.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting",
    desc: "Role-based dashboards with AI-powered insights. Demand forecasting, anomaly detection, and business health scoring at a glance.",
  },
  {
    icon: ShieldCheck,
    title: "Access Control",
    desc: "Role-based permissions for Admin, Manager, and Staff. Control who sees what with granular access policies across every module.",
  },
  {
    icon: Zap,
    title: "Automation Engine",
    desc: "Set rules for auto-reordering, low-stock alerts, supplier notifications, and report generation — all running in the background.",
  },
];

const highlights = [
  { icon: Globe, label: "Multi-location support" },
  { icon: Users, label: "Team collaboration" },
  { icon: Layers, label: "Modular architecture" },
  { icon: Zap, label: "Real-time sync" },
];

export default function PlatformPage() {
  return (
    <div className="relative bg-[#080f1e] text-white">
      {/* Hero */}
      <section className="relative border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium px-4 py-2 rounded-full mb-6">
            <Layers className="h-3.5 w-3.5" />
            Platform Overview
          </div>
          <h1
            className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
            style={{ fontFamily: "var(--font-syne), sans-serif" }}
          >
            The Complete{" "}
            <span className="text-emerald-400">Supply Chain OS</span>
          </h1>
          <p
            className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed mb-10"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            EcoTrack unifies inventory, suppliers, orders, and AI analytics
            into one intelligent platform — built to scale with your business.
          </p>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-sm px-6 h-11 rounded-xl transition-all hover:-translate-y-0.5"
            >
              <Zap className="h-4 w-4" />
              Start Free Trial
            </Link>
            <Link
              href="/ai-features"
              className="inline-flex items-center gap-2 bg-white/6 hover:bg-white/10 text-slate-300 hover:text-white font-normal text-sm px-5 h-11 rounded-xl border border-white/10 transition-all"
            >
              Explore AI
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="border-b border-white/[0.06] px-6 py-10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {highlights.map((h) => (
            <div
              key={h.label}
              className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 ring-1 ring-emerald-500/20">
                <h.icon className="h-4 w-4 text-emerald-400" />
              </div>
              <span className="text-sm font-medium text-slate-300">
                {h.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Modules */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: "var(--font-syne), sans-serif" }}
          >
            Platform <span className="text-emerald-400">Modules</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Every tool you need to run a modern supply chain — connected,
            automated, and powered by AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((m) => (
            <div
              key={m.title}
              className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 transition-all hover:border-emerald-500/20 hover:bg-white/[0.04]"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 ring-1 ring-emerald-500/20 transition-all group-hover:ring-emerald-500/40">
                <m.icon className="h-6 w-6 text-emerald-400" />
              </div>
              <h3
                className="text-lg font-semibold mb-2"
                style={{ fontFamily: "var(--font-syne), sans-serif" }}
              >
                {m.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {m.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Architecture */}
      <section className="border-t border-white/[0.06] px-6 py-24">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{ fontFamily: "var(--font-syne), sans-serif" }}
            >
              Built for{" "}
              <span className="text-emerald-400">Scale & Speed</span>
            </h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              EcoTrack runs on a modern stack designed for reliability. Our
              API-first architecture lets you integrate with ERPs, accounting
              tools, and e-commerce platforms without friction.
            </p>
            <ul className="space-y-3">
              {[
                "RESTful API with full documentation",
                "Webhook support for real-time events",
                "SSO & JWT-based authentication",
                "Responsive web + PWA-ready",
                "Daily automated backups",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm text-slate-300"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8">
            <div className="space-y-5">
              {[
                { label: "API Uptime", value: "99.99%" },
                { label: "Avg. Response", value: "< 120ms" },
                { label: "Data Centers", value: "4 Regions" },
                { label: "Encryption", value: "AES-256" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4"
                >
                  <span className="text-sm text-slate-400">{stat.label}</span>
                  <span className="text-sm font-bold text-emerald-400">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
