"use client";

import { Check, Sparkles, Calendar } from "lucide-react";

interface PricingCardProps {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  buttonText: string;
  popular: boolean;
  iconType: "calendar" | "sparkles";
  onSubscribe: (planName: string) => void;
}

export function PricingCard({
  name,
  price,
  period,
  description,
  features,
  buttonText,
  popular,
  iconType,
  onSubscribe,
}: PricingCardProps) {
  const Icon = iconType === "calendar" ? Calendar : Sparkles;
  
  return (
    <div
      className={`relative rounded-2xl p-8 transition-all duration-300 hover:scale-[1.02] ${
        popular
          ? "bg-gradient-to-b from-emerald-500/10 to-white/5 border-2 border-emerald-500/30 scale-105"
          : "bg-white/5 border border-white/10 hover:border-emerald-500/20"
      }`}
    >
      {/* Popular Badge */}
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full text-xs font-bold text-white shadow-lg">
          Most Popular
        </div>
      )}

      {/* Plan Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-4 text-emerald-400">
          <Icon size={28} strokeWidth={1.5} />
        </div>
        <h3 className="font-syne text-2xl font-bold text-white mb-2">{name}</h3>
        <p className="text-slate-400 text-sm mb-4">{description}</p>
        <div className="flex items-baseline justify-center gap-1">
          <span className="font-syne text-5xl font-extrabold text-white">
            {price}
          </span>
          <span className="text-slate-400 text-sm">{period}</span>
        </div>
      </div>

      {/* Features List */}
      <div className="space-y-3 mb-8">
        {features.map((feature, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="w-3 h-3 text-emerald-400" />
            </div>
            <span className="text-slate-300 text-sm">{feature}</span>
          </div>
        ))}
      </div>

      {/* Subscribe Button */}
      <button
        onClick={() => onSubscribe(name)}
        className={`w-full py-3 px-6 rounded-xl font-semibold text-sm transition-all ${
          popular
            ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/25"
            : "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-emerald-500/20 text-white"
        }`}
      >
        {buttonText}
      </button>
    </div>
  );
}

export default function PricingCards({ onSubscribe }: { onSubscribe: (planName: string) => void }) {
  const plans = [
    {
      name: "Monthly",
      price: "৳1,000",
      period: "/month",
      iconType: "calendar" as const,
      description: "Perfect for trying out EcoTrack or small teams",
      features: [
        "Up to 1,000 products",
        "Basic AI analytics",
        "Email support",
        "1 user account",
        "5 GB storage",
        "Standard reports",
      ],
      buttonText: "Get Started",
      popular: false,
    },
    {
      name: "Yearly",
      price: "৳10,000",
      period: "/year",
      iconType: "sparkles" as const,
      description: "Best value for growing businesses and teams",
      features: [
        "Unlimited products",
        "Advanced AI analytics",
        "Priority support 24/7",
        "Up to 10 user accounts",
        "100 GB storage",
        "Custom reports & dashboards",
        "API access",
        "Integrations available",
      ],
      buttonText: "Get Started",
      popular: true,
    },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {plans.map((plan) => (
        <PricingCard key={plan.name} {...plan} onSubscribe={onSubscribe} />
      ))}
    </div>
  );
}
