export type ProjectTypeOption = {
  value: string;
  label: string;
  basePrice: number;
};

export type DesignLevelOption = {
  value: string;
  label: string;
  multiplier: number;
  description: string;
};

export type FeaturePack = {
  value: string;
  label: string;
  description: string;
  price: number;
};

export const projectTypes: ProjectTypeOption[] = [
  { value: "saas", label: "SaaS / Plateforme", basePrice: 4200 },
  { value: "site-vitrine", label: "Site vitrine premium", basePrice: 2800 },
  { value: "rebranding", label: "Refonte / Rebranding", basePrice: 3500 },
  { value: "ecommerce", label: "E-commerce headless", basePrice: 4800 },
];

export const designLevels: DesignLevelOption[] = [
  {
    value: "starter",
    label: "Starter",
    multiplier: 1,
    description: "Design premium sur base existante + personnalisation.",
  },
  {
    value: "sur-mesure",
    label: "Sur-mesure",
    multiplier: 1.45,
    description: "Direction artistique dédiée, animations avancées.",
  },
  {
    value: "luxe",
    label: "Luxe / Impact",
    multiplier: 1.8,
    description: "Expérience immersive, motion design et 3D/IA générative.",
  },
];

export const featurePacks: FeaturePack[] = [
  {
    value: "automations",
    label: "Automatisations pro",
    description: "Workflows Zapier/Make, reporting Notion, notifications Slack.",
    price: 1200,
  },
  {
    value: "portal",
    label: "Portail client",
    description: "Espace client sécurisé + upload fichiers + suivi DevOps.",
    price: 1600,
  },
  {
    value: "payments",
    label: "Paiement & e-sign",
    description: "Stripe, IBAN, DocuSign avec branding personnalisé.",
    price: 950,
  },
  {
    value: "ai-copilot",
    label: "IA Copilot",
    description: "Chatbot OpenAI + base de connaissances + analytics usage.",
    price: 1800,
  },
];

export const marketingSupportPrice = 680;
export const rushMultiplier = 1.3;
