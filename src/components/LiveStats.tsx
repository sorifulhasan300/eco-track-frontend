"use client";
import { useEffect, useRef, useState } from "react";

const stats = [
  {
    icon: "ti-box",
    value: 12,
    suffix: "k",
    label: "Products tracked",
    trend: "+18% this month",
  },
  {
    icon: "ti-receipt",
    value: 2.4,
    suffix: "M",
    label: "Orders processed",
    trend: "+32% this month",
  },
  {
    icon: "ti-users",
    value: 8,
    suffix: "k",
    label: "Active businesses",
    trend: "+9% this month",
  },
  {
    icon: "ti-cpu",
    value: 1.2,
    suffix: "M",
    label: "AI insights generated",
    trend: "+54% this month",
  },
];

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const isDecimal = target % 1 !== 0;
    const raf = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      const val = target * ease;
      setCount(isDecimal ? parseFloat(val.toFixed(1)) : Math.round(val));
      if (p < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [active, target, duration]);
  return count;
}

function StatCard({
  icon, value, suffix, label, trend, active, delay,
}: (typeof stats)[0] & { active: boolean; delay: number }) {
  const count = useCountUp(value, 1800 + delay, active);
  return (
    <div className="bg-slate-900 p-8 text-center flex flex-col items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
        <i className={`ti ${icon} text-xl`} aria-hidden="true" />
      </div>
      <div>
        <div className="font-syne text-3xl font-extrabold text-white leading-none">
          <span className="text-emerald-400">{count}</span>
          <span className="text-emerald-400">{suffix}</span>
        </div>
        <div className="text-xs text-slate-500 mt-1">{label}</div>
      </div>
      <div className="inline-flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-500/10 rounded-full px-2.5 py-0.5">
        <i className="ti ti-trending-up text-xs" aria-hidden="true" />
        {trend}
      </div>
    </div>
  );
}

export default function LiveStats() {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setActive(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="bg-slate-900 border-y border-white/5 py-20 px-4 sm:px-6 lg:px-10 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-medium px-4 py-2 rounded-full mb-4">
          <i className="ti ti-activity text-sm" aria-hidden="true" />
          Platform activity
        </div>
        <h2 className="font-syne text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          Trusted by teams <span className="text-emerald-400">worldwide</span>
        </h2>
        <p className="text-sm text-slate-400 font-light">
          Real numbers from businesses running on EcoTrack right now.
        </p>
      </div>

      <div
        ref={ref}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto rounded-2xl overflow-hidden border border-white/6 divide-x divide-white/6"
      >
        {stats.map((s, i) => (
          <StatCard key={s.label} {...s} active={active} delay={i * 200} />
        ))}
      </div>
    </section>
  );
}