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
import type { Metadata } from "next";
// import { ReviewsSection } from "@/components/sections/reviews-section";

export const metadata: Metadata = {
  title: "Développeur Web & Agence Web - Créer un site web professionnel",
  description: "Développeur web et agence web à Paris. Création de sites web professionnels sur mesure, développement web, refonte de site. Devis gratuit et mise en ligne rapide.",
  keywords: [
    "développeur web",
    "développeur",
    "agence web",
    "créer un site web",
    "création site web",
    "développement web",
    "site web professionnel",
    "développeur web Paris",
    "agence web Paris",
    "créer site internet",
  ],
  openGraph: {
    title: "Développeur Web & Agence Web - Créer un site web professionnel",
    description: "Développeur web et agence web à Paris. Création de sites web professionnels sur mesure.",
    type: "website",
    url: "https://www.webdifference.fr",
  },
};

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
      <AppointmentSection />
      <FaqSection />
      <ResourcesSection />
    </>
  );
}