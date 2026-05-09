"use client";

import PricingCards from "@/components/PricingCards";

export default function PricingSection() {
  const handleSubscribe = (planName: string) => {
    alert(
      `⚠️ Pricing options are not available now. Next update will make the pricing option available for ${planName} plan.`
    );
  };

  return <PricingCards onSubscribe={handleSubscribe} />;
}
