import FAQ from "@/components/Faq";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import LiveStats from "@/components/LiveStats";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <div className="">
        <HeroSection></HeroSection>
        <LiveStats></LiveStats>
        <HowItWorks></HowItWorks>
        <FAQ></FAQ>
        <Testimonials></Testimonials>
      </div>
    </>
  );
}
