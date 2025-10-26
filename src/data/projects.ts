type ProjectStatus = "PLANNED" | "IN_PROGRESS" | "LIVE" | "MAINTENANCE";

export type ProjectCard = {
  slug: string;
  title: string;
  tagline: string;
  status: ProjectStatus;
  impact: string;
  stack: string[];
  thumbnail: string;
  description: string;
  badges?: string[];
  metrics?: Array<{ label: string; value: string }>;
  liveUrl?: string;
  caseStudyUrl?: string;
  inProgress?: boolean;
};

export const projects: ProjectCard[] = [
  {
    slug: "flowops-analytics",
    title: "FlowOps Analytics",
    tagline: "Dashboard SaaS temps réel pour équipes ops.",
    status: "IN_PROGRESS",
    impact: "+42% MRR en 4 mois",
    stack: ["Next.js", "Supabase", "Plausible", "OpenAI"],
    thumbnail: "/assets/projects/flowops-cover.jpg",
    description:
      "MVP data-driven livré en 21 jours, automatisation des rapports et IA copilote pour les insights.",
    badges: ["Projet en cours", "Automation IA"],
    metrics: [
      { label: "Time-to-MVP", value: "21 jours" },
      { label: "Notifications Slack", value: "120+/jour" },
    ],
    inProgress: true,
  },
  {
    slug: "lumen-cosmetics",
    title: "Lumen Cosmetics",
    tagline: "Site e-commerce headless Luxe.",
    status: "LIVE",
    impact: "x3 taux de conversion",
    stack: ["Next.js", "Shopify", "Stripe", "Zapier"],
    thumbnail: "/assets/projects/lumen-cover.jpg",
    description:
      "Refonte premium avec automatisation des parcours marketing + shooting virtuel généré par IA.",
    badges: ["Headless commerce", "Automations marketing"],
    metrics: [
      { label: "Revenus 30j", value: "+182%" },
      { label: "AOV", value: "+68€" },
    ],
    liveUrl: "https://lumen.example.com",
    caseStudyUrl: "/portfolio/lumen-cosmetics",
  },
  {
    slug: "nova-crm",
    title: "Nova CRM",
    tagline: "CRM IA pour équipes commerciales B2B.",
    status: "PLANNED",
    impact: "MVP validé au board",
    stack: ["Next.js", "Node.js", "PostgreSQL", "OpenAI"],
    thumbnail: "/assets/projects/nova-cover.jpg",
    description:
      "Prototype interactif et flows onboarding automatisés (DocuSign, Stripe, Notion).",
    badges: ["Prototype live", "Portal client"],
    metrics: [
      { label: "Prototypes testeurs", value: "15" },
      { label: "Cycle signature", value: "-60%" },
    ],
    caseStudyUrl: "/portfolio/nova-crm",
  },
];
