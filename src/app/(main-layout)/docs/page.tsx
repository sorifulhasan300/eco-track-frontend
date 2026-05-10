"use client";

import Link from "next/link";
import {
  BookOpen,
  UserPlus,
  LayoutDashboard,
  Package,
  ClipboardList,
  BarChart3,
  Users,
  Settings,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create Your Account",
    desc: "Sign up at /register with your email and role (Admin, Manager, or Staff). Verify your email to activate your workspace.",
  },
  {
    icon: LayoutDashboard,
    title: "Explore the Dashboard",
    desc: "After login you land on the role-based dashboard. Admins see full analytics, Managers see reports & staff performance, and Staff see assigned tasks.",
  },
  {
    icon: Package,
    title: "Add & Manage Products",
    desc: "Head to Products to create SKUs, set stock levels, assign suppliers, and upload images. Use bulk actions for large catalogs.",
  },
  {
    icon: ClipboardList,
    title: "Track Orders",
    desc: "Create purchase and sales orders under Orders. Monitor status from pending to fulfilled. Auto-alerts notify you of low stock triggers.",
  },
  {
    icon: BarChart3,
    title: "AI Analytics",
    desc: "Visit Analytics for AI-powered insights: demand forecasting, anomaly detection, supplier recommendations, and business health scoring.",
  },
  {
    icon: Users,
    title: "Manage Users (Admin)",
    desc: "Admins can invite team members, assign roles, and control access permissions from the User Management panel.",
  },
  {
    icon: Settings,
    title: "Configure Settings",
    desc: "Set reorder thresholds, notification preferences, currency, and supplier defaults under Settings to tailor EcoTrack to your workflow.",
  },
];

export default function DocsPage() {
  return (
    <div className="relative bg-[#080f1e] text-white">
      {/* Hero */}
      <section className="relative border-b border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium px-4 py-2 rounded-full mb-6">
            <BookOpen className="h-3.5 w-3.5" />
            Documentation
          </div>
          <h1
            className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
            style={{ fontFamily: "var(--font-syne), sans-serif" }}
          >
            Getting Started with{" "}
            <span className="text-emerald-400">EcoTrack</span>
          </h1>
          <p
            className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            A quick-start guide to help you navigate the platform, manage
            inventory, and leverage AI features from day one.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="space-y-8">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="flex gap-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 transition-all hover:border-emerald-500/20 hover:bg-white/[0.04]"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 ring-1 ring-emerald-500/20">
                <step.icon className="h-6 w-6 text-emerald-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    Step {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ fontFamily: "var(--font-syne), sans-serif" }}
                >
                  {step.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section className="border-t border-white/[0.06] px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-2xl md:text-3xl font-bold text-center mb-10"
            style={{ fontFamily: "var(--font-syne), sans-serif" }}
          >
            Quick <span className="text-emerald-400">Links</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: "Register", href: "/register" },
              { label: "Login", href: "/login" },
              { label: "Pricing", href: "/pricing" },
              { label: "AI Features", href: "/ai-features" },
              { label: "Privacy Policy", href: "/privacy-policy" },
              { label: "Terms of Service", href: "/terms-of-service" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 text-sm text-slate-300 transition-all hover:border-emerald-500/20 hover:bg-white/[0.04] hover:text-white"
              >
                {link.label}
                <ArrowRight className="h-4 w-4 text-slate-500" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
