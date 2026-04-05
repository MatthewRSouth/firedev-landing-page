import HeroSection from "@/components/sections/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import ProcessSection from "@/components/sections/ProcessSection";
import ResultsSection from "@/components/sections/ResultsSection";
import PricingSection from "@/components/sections/PricingSection";
import CTASection from "@/components/sections/CTASection";
import FooterSection from "@/components/sections/FooterSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProblemSection />
      <ProcessSection />
      <ResultsSection />
      <PricingSection />
      <CTASection />
      <FooterSection />
    </main>
  );
}
