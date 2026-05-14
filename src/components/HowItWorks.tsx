const steps = [
  {
    icon: "ti-building-store",
    title: "Connect your store",
    desc: "Link your existing inventory system or start fresh. Import products via CSV or our REST API in minutes.",
  },
  {
    icon: "ti-tag",
    title: "AI auto-classifies",
    desc: "Gemini AI reads every product description and assigns categories, risk tags, and supplier recommendations automatically.",
  },
  {
    icon: "ti-chart-bar",
    title: "Get live analytics",
    desc: "Your dashboard fills with real-time charts, low-stock alerts, and AI-generated business health summaries.",
  },
  {
    icon: "ti-rocket",
    title: "Act on insights",
    desc: "One-click purchase orders, AI-drafted supplier emails, and reorder suggestions sent straight to your team.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-[#080f1e] py-24 px-4 sm:px-6 lg:px-10">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-medium px-4 py-2 rounded-full mb-4">
          <i className="ti ti-route text-sm" aria-hidden="true" />
          Workflow
        </div>
        <h2 className="font-syne text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          From setup to <span className="text-emerald-400">smart insights</span>
        </h2>
        <p className="text-sm text-slate-400 font-light max-w-md mx-auto">
          Get your entire inventory running on AI in four simple steps.
        </p>
      </div>

      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-0 max-w-6xl mx-auto">
        {/* Connector line */}
        <div className="hidden lg:block absolute top-8 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent z-0" />

        {steps.map((step, i) => (
          <div key={step.title} className="relative z-10 text-center px-5 group">
            <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full border border-emerald-500/25 bg-slate-900 mb-5 mx-auto transition-all duration-300 group-hover:bg-emerald-500/10 group-hover:border-emerald-500 group-hover:scale-110">
              {/* Dashed ring */}
              <div className="absolute inset-[-5px] rounded-full border border-dashed border-emerald-500/15" />
              {/* Step number badge */}
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-white font-syne text-[10px] font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <i className={`ti ${step.icon} text-2xl text-emerald-400`} aria-hidden="true" />
            </div>
            <h3 className="font-syne text-[15px] font-bold text-white mb-2">{step.title}</h3>
            <p className="text-[12.5px] text-slate-400 leading-relaxed font-light">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}