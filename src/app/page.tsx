import { AboutSection } from "@/components/sections/about-section";
import { AutomationSection } from "@/components/sections/automation-section";
import { ContactSection } from "@/components/sections/contact-section";
import { HeroSection } from "@/components/sections/hero-section";
import { OffersSection } from "@/components/sections/offers-section";
import { PortfolioPreviewSection } from "@/components/sections/portfolio-preview-section";
import { ResourcesSection } from "@/components/sections/resources-section";
import { WhyChooseSection } from "@/components/sections/why-choose-section";
import { FaqSection } from "@/components/sections/faq-section";
import { BenefitsStrip } from "@/components/sections/benefits-strip";
import ConversationSection from '@/components/sections/conversation-section';
import { ProductSection } from "@/components/sections/product-section";
import { ExistingSiteSection } from "@/components/sections/existing-site-section";
import ReviewsRecommendationsSection from "@/components/sections/reviews-recommendations-section";
import ProjectCalloutSection  from "@/components/sections/project-callout-section";
import { AppointmentSection } from "@/components/sections/appointment-section";
// import { ReviewsSection } from "@/components/sections/reviews-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <BenefitsStrip />
      <PortfolioPreviewSection />
      {/* <ConversationSection /> */}
      {/* <ProjectCalloutSection /> */}
      <OffersSection />
      <ExistingSiteSection />
      <ReviewsRecommendationsSection />
      <FaqSection />
      <ResourcesSection />
      <AppointmentSection />
    </>
  );
}
