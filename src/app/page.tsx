import { AboutSection } from "@/components/sections/about-section";
import { AutomationSection } from "@/components/sections/automation-section";
import { ContactSection } from "@/components/sections/contact-section";
import { HeroSection } from "@/components/sections/hero-section";
import { OffersSection } from "@/components/sections/offers-section";
import { PortfolioPreviewSection } from "@/components/sections/portfolio-preview-section";
import { QuotePreviewSection } from "@/components/sections/quote-preview-section";
import { ResourcesSection } from "@/components/sections/resources-section";
import { ProofSection } from "@/components/sections/proof-section";
import { WhyChooseSection } from "@/components/sections/why-choose-section";
import { FaqSection } from "@/components/sections/faq-section";
import { AudienceSelectorSection } from "@/components/sections/audience-selector-section";
import { BenefitsStrip } from "@/components/sections/benefits-strip";
import { FloatingQuickActions } from "@/components/floating-quick-actions";

export default function Home() {
  return (
    <>
      <HeroSection />
      <BenefitsStrip />
      <ProofSection />
      <AudienceSelectorSection />
      <QuotePreviewSection />
      <OffersSection />
      <AutomationSection />
      <WhyChooseSection />
      <PortfolioPreviewSection />
      <ResourcesSection />
      <FaqSection />
      <AboutSection />
      <ContactSection />
      <FloatingQuickActions />
    </>
  );
}
