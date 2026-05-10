"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  BrainCircuit,
  TrendingUp,
  ShieldCheck,
  Zap,
  BarChart3,
  Boxes,
  ArrowRight,
  Sparkles,
  ChevronRight,
} from "lucide-react";

/* ── Animated canvas background (same style as hero) ── */
function AIBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const EM = "#10b981";
    let animId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;

    const nodes = Array.from({ length: 24 }, () => ({
      x: Math.random() * W(),
      y: Math.random() * H(),
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 2 + 1,
      pulse: Math.random() * Math.PI * 2,
      type: Math.random() > 0.75 ? "hub" : "node",
    }));

    const loop = () => {
      ctx.fillStyle = "#080f1e";
      ctx.fillRect(0, 0, W(), H());

      // Hex grid
      const size = 32;
      ctx.save();
      ctx.globalAlpha = 0.03;
      ctx.strokeStyle = EM;
      ctx.lineWidth = 0.5;
      for (let r = 0; r < Math.ceil(H() / size) + 1; r++) {
        for (let c = 0; c < Math.ceil(W() / size / 1.73) + 1; c++) {
          const ox = c * size * 1.73 + (r % 2) * size * 0.87;
          const oy = r * size * 1.5;
          ctx.beginPath();
          for (let k = 0; k < 6; k++) {
            const a = (Math.PI / 180) * (60 * k - 30);
            if (k === 0) {
              ctx.moveTo(ox + size * Math.cos(a), oy + size * Math.sin(a));
            } else {
              ctx.lineTo(ox + size * Math.cos(a), oy + size * Math.sin(a));
            }
          }
          ctx.closePath();
          ctx.stroke();
        }
      }
      ctx.restore();

      // Network nodes
      nodes.forEach((a, i) => {
        a.x += a.vx;
        a.y += a.vy;
        if (a.x < 0 || a.x > W()) a.vx *= -1;
        if (a.y < 0 || a.y > H()) a.vy *= -1;
        a.pulse += 0.015;
        nodes.slice(i + 1).forEach((b) => {
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 140) {
            ctx.save();
            ctx.globalAlpha = (1 - d / 140) * 0.12;
            ctx.strokeStyle = EM;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            ctx.restore();
          }
        });
        const p = Math.sin(a.pulse) * 0.5 + 0.5;
        const r = a.type === "hub" ? a.r * 2.2 : a.r;
        if (a.type === "hub") {
          ctx.save();
          ctx.globalAlpha = 0.06 + p * 0.06;
          ctx.strokeStyle = EM;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(a.x, a.y, r + 6 + p * 5, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }
        ctx.save();
        ctx.globalAlpha = 0.4 + p * 0.25;
        ctx.fillStyle = a.type === "hub" ? EM : "#059669";
        ctx.beginPath();
        ctx.arc(a.x, a.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

/* ── Data ── */
const features = [
  {
    icon: BrainCircuit,
    title: "Smart Demand Forecasting",
    desc: "Our AI engine analyzes historical sales, seasonal trends, and market signals to predict future demand with 95%+ accuracy — eliminating guesswork from inventory planning.",
    stat: "95%",
    statLabel: "Forecast accuracy",
  },
  {
    icon: Boxes,
    title: "Automated Reorder Points",
    desc: "Dynamic safety stock calculations that adapt to supplier lead times, demand volatility, and business priorities. Never run out of stock or over-order again.",
    stat: "40%",
    statLabel: "Less excess stock",
  },
  {
    icon: TrendingUp,
    title: "Sales Growth Insights",
    desc: "AI surfaces hidden growth opportunities — underperforming categories, optimal pricing windows, and high-margin product bundles — directly in your dashboard.",
    stat: "3x",
    statLabel: "Faster decisions",
  },
  {
    icon: ShieldCheck,
    title: "Anomaly Detection",
    desc: "Real-time alerts for unusual stock movements, supplier delays, and fraudulent transactions. Catch issues before they impact your bottom line.",
    stat: "24/7",
    statLabel: "Monitoring",
  },
  {
    icon: Zap,
    title: "AI Supplier Recommendations",
    desc: "Machine learning ranks suppliers by reliability, cost, and quality scores — automatically suggesting the best vendor for every reorder.",
    stat: "30%",
    statLabel: "Cost reduction",
  },
  {
    icon: BarChart3,
    title: "Predictive Business Health",
    desc: "A real-time AI scorecard that monitors cash flow, turnover rate, and operational efficiency — giving you an executive summary before you even ask.",
    stat: "360°",
    statLabel: "Business view",
  },
];

const benefits = [
  {
    title: "Slash Operational Costs",
    desc: "Reduce holding costs, minimize dead stock, and optimize warehouse space with AI-driven inventory balancing.",
  },
  {
    title: "Prevent Stockouts Automatically",
    desc: "Never lose a sale to empty shelves again. Predictive alerts fire before you hit critical levels.",
  },
  {
    title: "Empower Data-Driven Decisions",
    desc: "Replace spreadsheet guesswork with concrete AI recommendations that your team can act on immediately.",
  },
  {
    title: "Scale Without Extra Headcount",
    desc: "Manage 10x more SKUs with the same team size. The AI handles the heavy lifting while your staff focuses on strategy.",
  },
  {
    title: "Unified Supply Chain Visibility",
    desc: "Connect suppliers, warehouse data, and sales channels into one intelligent layer you can actually understand.",
  },
  {
    title: "Continuous Self-Improvement",
    desc: "The more you use EcoTrack, the smarter it gets. Our models retrain weekly on your latest data for ever-increasing accuracy.",
  },
];

/* ── Page ── */
export default function AIFeaturesPage() {
  return (
    <div className="relative bg-[#080f1e] text-white">
      {/* ── Hero ── */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <AIBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080f1e]/50 via-transparent to-[#080f1e]" />

        <div className="relative z-10 text-center px-6 py-24 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium px-4 py-2 rounded-full mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            Artificial Intelligence
          </div>

          <h1
            className="text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6"
            style={{ fontFamily: "var(--font-syne), sans-serif" }}
          >
            Intelligence Built Into
            <br />
            <span className="text-emerald-400">Every Decision.</span>
          </h1>

          <p
            className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto mb-10"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            EcoTrack isn&apos;t just an inventory manager — it&apos;s a supply chain brain.
            From forecasting to anomaly detection, our AI turns raw data into
            profitable action.
          </p>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-sm px-6 h-11 rounded-xl transition-all hover:-translate-y-0.5"
            >
              <Zap className="h-4 w-4" />
              Try AI Features Free
            </Link>
            <Link
              href="/dashboard/analytics"
              className="inline-flex items-center gap-2 bg-white/6 hover:bg-white/10 text-slate-300 hover:text-white font-normal text-sm px-5 h-11 rounded-xl border border-white/10 transition-all"
            >
              Live Dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Features Grid ── */}
      <section className="relative z-10 px-6 py-24 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: "var(--font-syne), sans-serif" }}
          >
            Core <span className="text-emerald-400">AI Capabilities</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Six intelligent modules working together to automate, predict, and
            optimize your entire supply chain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 transition-all hover:border-emerald-500/20 hover:bg-white/[0.04]"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 ring-1 ring-emerald-500/20">
                <f.icon className="h-6 w-6 text-emerald-400" />
              </div>

              <h3
                className="text-lg font-semibold mb-2"
                style={{ fontFamily: "var(--font-syne), sans-serif" }}
              >
                {f.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-5">
                {f.desc}
              </p>

              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-emerald-400">
                  {f.stat}
                </span>
                <span className="text-xs text-slate-500 uppercase tracking-wider">
                  {f.statLabel}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="relative z-10 px-6 py-24 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <h2
                className="text-3xl md:text-4xl font-bold mb-6"
                style={{ fontFamily: "var(--font-syne), sans-serif" }}
              >
                Why Teams Choose
                <br />
                <span className="text-emerald-400">AI-Powered Operations</span>
              </h2>
              <p className="text-slate-400 leading-relaxed mb-8">
                Manual inventory management is expensive, error-prone, and
                impossible to scale. EcoTrack&apos;s AI layer replaces reactive
                firefighting with proactive intelligence — so your team spends
                less time on spreadsheets and more time growing the business.
              </p>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { num: "98%", label: "Stockout reduction" },
                  { num: "40%", label: "Lower holding costs" },
                  { num: "3x", label: "Faster reordering" },
                  { num: "24/7", label: "AI monitoring" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5"
                  >
                    <div className="text-2xl font-bold text-emerald-400 mb-1">
                      {s.num}
                    </div>
                    <div className="text-xs text-slate-400">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right */}
            <div className="space-y-4">
              {benefits.map((b, i) => (
                <div
                  key={b.title}
                  className="flex gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 transition-all hover:border-emerald-500/20 hover:bg-white/[0.04]"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 text-sm font-bold ring-1 ring-emerald-500/20">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h4
                      className="font-semibold mb-1"
                      style={{ fontFamily: "var(--font-syne), sans-serif" }}
                    >
                      {b.title}
                    </h4>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {b.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative z-10 px-6 py-24">
        <div className="max-w-4xl mx-auto text-center rounded-3xl border border-emerald-500/20 bg-gradient-to-b from-emerald-500/[0.07] to-transparent p-10 md:p-16">
          <BrainCircuit className="mx-auto h-10 w-10 text-emerald-400 mb-6" />
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: "var(--font-syne), sans-serif" }}
          >
            Ready to Let AI Run Your Supply Chain?
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto mb-8">
            Join hundreds of teams that replaced inventory chaos with automated
            intelligence. Set up in minutes, see results in days.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-sm px-8 h-12 rounded-xl transition-all hover:-translate-y-0.5"
          >
            Get Started Free
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
