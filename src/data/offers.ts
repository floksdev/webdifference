export type OfferTierKey = "starter" | "premium" | "growth" | "custom";

export type OfferPlan = {
  slug: OfferTierKey;
  title: string;
  price: string;
  billing: string;
  description: string;
  features: string[];
  basePrice: number;
  highlight?: boolean;
  ctaLabel?: string;
};

export const offers: OfferPlan[] = [
  {
    slug: "starter",
    title: "Starter",
    price: "3 900 €",
    billing: "one-shot",
    description:
      "Landing page différenciante + automatisations essentielles pour convertir vos premiers leads.",
    features: [
      "Design sur-mesure + copywriting",
      "CMS optimisé SEO",
      "Automatisation collecte leads",
      "Chatbot IA basique",
    ],
    basePrice: 3900,
    ctaLabel: "Débloquer Starter",
  },
  {
    slug: "premium",
    title: "Premium",
    price: "7 900 €",
    billing: "one-shot + options mensuelles",
    description:
      "Produit SaaS ou e-commerce headless avec workflows avancés + portail client personnalisé.",
    features: [
      "Prototype interactif haute fidélité",
      "Générateur de devis automatisé",
      "Portail client + espace fichiers",
      "Dashboard analytics Plausible",
    ],
    highlight: true,
    basePrice: 7900,
    ctaLabel: "Lancer Premium",
  },
  {
    slug: "growth",
    title: "Growth Ops",
    price: "Sur devis",
    billing: "abonnement mensuel",
    description:
      "Squad produit + automation dédiée pour scaler votre produit : IA copilote, observabilité et marketing ops.",
    features: [
      "IA copilote custom (support + sales)",
      "Automations marketing multi-canaux",
      "Reporting temps réel & DataOps",
      "Run DevOps + QA continue",
    ],
    basePrice: 0,
    ctaLabel: "Créer mon plan Growth",
  },
  {
    slug: "custom",
    title: "Sur-mesure",
    price: "Budget à définir",
    billing: "mix projet + récurrence",
    description:
      "Workshop stratégique pour bâtir votre offre idéale : nous combinons modules Starter, Premium et Growth.",
    features: [
      "Audit différenciation & priorisation",
      "Blueprint produit + backlog agile",
      "Plan d'automatisation complet",
      "Roadmap IA & analytics personnalisée",
    ],
    basePrice: 0,
    ctaLabel: "Booker un audit",
  },
];
