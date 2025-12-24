import dynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/hero-section";
import { BenefitsStrip } from "@/components/sections/benefits-strip";

// Lazy load des sections non critiques (en dessous de la ligne de flottaison)
// Cela réduit la taille du bundle initial et améliore le FCP/LCP
const PortfolioPreviewSection = dynamic(
  () => import("@/components/sections/portfolio-preview-section").then((mod) => ({ default: mod.PortfolioPreviewSection })),
  { ssr: true } // SSR activé pour le SEO
);

const OffersSection = dynamic(
  () => import("@/components/sections/offers-section").then((mod) => ({ default: mod.OffersSection })),
  { ssr: true }
);

const ExistingSiteSection = dynamic(
  () => import("@/components/sections/existing-site-section").then((mod) => ({ default: mod.ExistingSiteSection })),
  { ssr: true }
);

const ReviewsRecommendationsSection = dynamic(
  () => import("@/components/sections/reviews-recommendations-section"),
  { ssr: true }
);

const FaqSection = dynamic(
  () => import("@/components/sections/faq-section").then((mod) => ({ default: mod.FaqSection })),
  { ssr: true }
);

const AppointmentSection = dynamic(
  () => import("@/components/sections/appointment-section").then((mod) => ({ default: mod.AppointmentSection })),
  { ssr: true }
);

const ResourcesSection = dynamic(
  () => import("@/components/sections/resources-section").then((mod) => ({ default: mod.ResourcesSection })),
  { ssr: true }
);

export default function Home() {
  return (
    <>
      <HeroSection />
      <BenefitsStrip />
      <PortfolioPreviewSection />
      <OffersSection />
      <ExistingSiteSection />
      <ReviewsRecommendationsSection />
      <FaqSection />
      <AppointmentSection />
      <ResourcesSection />
    </>
  );
}
