import { AboutSection } from "@/components/sections/about-section";
import { AutomationSection } from "@/components/sections/automation-section";
import { ContactSection } from "@/components/sections/contact-section";
import { HeroSection } from "@/components/sections/hero-section";
import { OffersSection } from "@/components/sections/offers-section";
import { PortfolioPreviewSection } from "@/components/sections/portfolio-preview-section";
import { QuotePreviewSection } from "@/components/sections/quote-preview-section";
import { ResourcesSection } from "@/components/sections/resources-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <QuotePreviewSection />
      <PortfolioPreviewSection />
      <AutomationSection />
      <OffersSection />
      <AboutSection />
      <ResourcesSection />
      <ContactSection />
    </>
  );
}
