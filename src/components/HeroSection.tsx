"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const EM = "#10b981",
      EM2 = "#059669";
    let animId: number,
      t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;

    const nodes = Array.from({ length: 28 }, () => ({
      x: Math.random() * W(),
      y: Math.random() * H(),
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2.5 + 1,
      pulse: Math.random() * Math.PI * 2,
      type: Math.random() > 0.7 ? "hub" : "node",
    }));

    const BARS = 18;
    const bars = Array.from({ length: BARS }, (_, i) => ({
      x: (i / BARS) * W() * 1.1 - W() * 0.05,
      h: Math.random() * 60 + 20,
      target: Math.random() * 60 + 20,
      speed: Math.random() * 0.03 + 0.01,
    }));

    const loop = () => {
      t++;
      ctx.fillStyle = "#080f1e";
      ctx.fillRect(0, 0, W(), H());

      // Hex grid
      const size = 28;
      ctx.save();
      ctx.globalAlpha = 0.04;
      ctx.strokeStyle = EM;
      ctx.lineWidth = 0.5;
      for (let r = 0; r < Math.ceil(H() / size) + 1; r++) {
        for (let c = 0; c < Math.ceil(W() / size / 1.73) + 1; c++) {
          const ox = c * size * 1.73 + (r % 2) * size * 0.87;
          const oy = r * size * 1.5;
          ctx.beginPath();
          for (let k = 0; k < 6; k++) {
            const a = (Math.PI / 180) * (60 * k - 30);
            k === 0
              ? ctx.moveTo(ox + size * Math.cos(a), oy + size * Math.sin(a))
              : ctx.lineTo(ox + size * Math.cos(a), oy + size * Math.sin(a));
          }
          ctx.closePath();
          ctx.stroke();
        }
      }
      ctx.restore();

      // Animated bars
      bars.forEach((b, i) => {
        b.h += (b.target - b.h) * b.speed;
        if (Math.abs(b.h - b.target) < 0.5) b.target = Math.random() * 70 + 15;
        const bw = (W() / BARS) * 0.55;
        const bx = b.x + (W() / BARS) * 0.22;
        ctx.save();
        ctx.globalAlpha = 0.12;
        ctx.fillStyle = EM;
        ctx.fillRect(bx, H() - b.h - 30, bw, b.h);
        ctx.globalAlpha = 0.3;
        ctx.fillRect(bx, H() - b.h - 30, bw, 2);
        ctx.restore();
      });

      // Network nodes
      nodes.forEach((a, i) => {
        a.x += a.vx;
        a.y += a.vy;
        if (a.x < 0 || a.x > W()) a.vx *= -1;
        if (a.y < 0 || a.y > H()) a.vy *= -1;
        a.pulse += 0.02;
        nodes.slice(i + 1).forEach((b) => {
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 130) {
            ctx.save();
            ctx.globalAlpha = (1 - d / 130) * 0.18;
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
        const r = a.type === "hub" ? a.r * 2 : a.r;
        if (a.type === "hub") {
          ctx.save();
          ctx.globalAlpha = 0.08 + p * 0.07;
          ctx.strokeStyle = EM;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(a.x, a.y, r + 5 + p * 4, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }
        ctx.save();
        ctx.globalAlpha = 0.5 + p * 0.3;
        ctx.fillStyle = a.type === "hub" ? EM : EM2;
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

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#080f1e]">
      {/* Canvas background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080f1e]/60 via-transparent to-[#080f1e]/90" />
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(16,185,129,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(16,185,129,0.6) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 py-20 max-w-6xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium px-4 py-2 rounded-full mb-8">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          AI-Powered Supply Chain Platform
        </div>

        <h1 className="font-syne text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-6">
          Smarter Inventory,
          <br />
          <span className="text-emerald-400">Zero Stockouts.</span>
          <br />
          <span className="text-white/50">Powered by AI.</span>
        </h1>

        <p className="text-slate-400 text-base font-light italic leading-relaxed max-w-xl mx-auto mb-10">
          EcoTrack automates your entire supply chain — from real-time stock
          alerts to AI-generated supplier recommendations — so you never
          oversell or overstock again.
        </p>

        <div className="flex items-center justify-center gap-3 flex-wrap mb-12">
          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-sm px-6 h-11 rounded-xl transition-all hover:-translate-y-0.5"
          >
            🚀 Start for free
          </Link>
          <Link
            href="#demo"
            className="inline-flex items-center gap-2 bg-white/6 hover:bg-white/10 text-slate-300 hover:text-white font-normal text-sm px-5 h-11 rounded-xl border border-white/10 transition-all"
          >
            ▶ Watch demo
          </Link>
        </div>

        <div className="inline-flex flex-wrap justify-center border border-white/8 rounded-xl bg-white/[0.03] backdrop-blur-xl overflow-hidden">
          {[
            { num: "12k+", label: "Products tracked" },
            { num: "98%", label: "Stockout reduction" },
            { num: "4 AI", label: "Core features" },
            { num: "3x", label: "Faster reordering" },
          ].map((s, i, arr) => (
            <div
              key={s.label}
              className={`px-4 sm:px-6 py-3 text-center ${i < arr.length - 1 ? "border-r border-white/7" : ""}`}
            >
              <div className="font-syne text-xl font-bold text-emerald-400">
                {s.num}
              </div>
              <div className="text-xs text-slate-400 mt-0.5 whitespace-nowrap">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
