/* eslint-disable react/no-unescaped-entities */
export const testimonials = [
  {
    text: "EcoTrack's AI flagged a stockout risk three weeks before it happened. We reordered in time and avoided $40k in lost sales. Genuinely impressive.",
    name: "Rafiq Karim",
    role: "Operations Manager, NovaMart",
    initials: "RK",
    tag: "Retail",
    avatarClass:
      "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25",
  },
  {
    text: "The auto-tagging alone saved our team 12 hours a week. We used to manually classify 800+ SKUs. Now it's done in seconds with 97% accuracy.",
    name: "Sadia Jahan",
    role: "Supply Chain Lead, FactoryX",
    initials: "SJ",
    tag: "Manufacturing",
    avatarClass: "bg-blue-500/10 text-blue-400 border border-blue-500/25",
  },
  {
    text: "The AI-generated purchase order emails are a game changer. I send professional supplier communications in one click. Our vendors love it too.",
    name: "Tanvir Hossain",
    role: "Founder, ShopEase BD",
    initials: "TH",
    tag: "E-commerce",
    avatarClass: "bg-purple-500/10 text-purple-400 border border-purple-500/25",
  },
  {
    text: "We cut overstock costs by 23% in the first quarter. The business health dashboard gives our managers exactly what they need every morning.",
    name: "Nadia Rahman",
    role: "Director, BulkTrade Ltd",
    initials: "NR",
    tag: "Wholesale",
    avatarClass: "bg-amber-500/10 text-amber-400 border border-amber-500/25",
  },
  {
    text: "Redis caching makes the dashboard blazing fast even with 50k products. The dev team clearly knows what enterprise performance means.",
    name: "Arif Shaikh",
    role: "CTO, SwiftLog Systems",
    initials: "AS",
    tag: "Logistics",
    avatarClass: "bg-pink-500/10 text-pink-400 border border-pink-500/25",
  },
  {
    text: "Managing medical supplies with expiry dates was a nightmare before EcoTrack. The AI perishable tagging and low-stock alerts are essential for us.",
    name: "Mehnaz Khan",
    role: "Procurement Head, MediStore",
    initials: "MK",
    tag: "Healthcare",
    avatarClass: "bg-teal-500/10 text-teal-400 border border-teal-500/25",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-slate-900 border-y border-white/5 py-24 px-4 sm:px-6 lg:px-10">
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-medium px-4 py-2 rounded-full mb-4">
          <i className="ti ti-quote text-sm" aria-hidden="true" />
          Testimonials
        </div>
        <h2 className="font-syne text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          Teams that <span className="text-emerald-400">love EcoTrack</span>
        </h2>
        <p className="text-sm text-slate-400 font-light max-w-sm mx-auto">
          From small warehouses to enterprise supply chains — here's what they say.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="relative bg-[#080f1e] border border-white/7 rounded-2xl p-6 group
              hover:border-emerald-500/25 transition-all duration-300 overflow-hidden"
          >
            {/* Top accent line on hover */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Tag */}
            <span className="absolute top-4 right-4 text-[10.5px] text-slate-500 bg-white/4 border border-white/7 px-2 py-0.5 rounded-lg">
              {t.tag}
            </span>

            <div className="text-4xl text-emerald-500/25 font-serif leading-none mb-2">"</div>
            <p className="text-[13px] text-slate-300 leading-relaxed font-light italic mb-4">
              {t.text}
            </p>

            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {Array(5).fill(0).map((_, i) => (
                <i key={i} className="ti ti-star text-amber-400 text-[13px]" aria-hidden="true" />
              ))}
            </div>

            <div className="flex items-center gap-3 border-t border-white/6 pt-4">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-syne text-[13px] font-bold flex-shrink-0 ${t.avatarClass}`}>
                {t.initials}
              </div>
              <div>
                <div className="text-[13px] font-medium text-white">{t.name}</div>
                <div className="text-[11.5px] text-slate-500">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}