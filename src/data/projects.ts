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
    tagline: "Tableau de bord SaaS tout-en-un pour équipes opérationnelles.",
    status: "IN_PROGRESS",
    impact: "+42% de croissance récurrente",
    stack: ["SaaS B2B", "Automatisation", "Support 7j/7"],
    thumbnail: "/assets/projects/flowops-cover.jpg",
    description:
      "Application en ligne livrée en 21 jours avec rapports automatiques et suivi client simplifié.",
    badges: ["Projet en cours", "Automatisation"],
    metrics: [
      { label: "Mise en ligne", value: "21 jours" },
      { label: "Satisfaction", value: "4.9/5" },
    ],
    inProgress: true,
  },
  {
    slug: "lumen-cosmetics",
    title: "Lumen Cosmetics",
    tagline: "E-commerce premium pour une marque beauté française.",
    status: "LIVE",
    impact: "x3 taux de conversion",
    stack: ["E-commerce", "SEO", "Email marketing"],
    thumbnail: "/assets/projects/lumen-cover.jpg",
    description:
      "Boutique en ligne modernisée avec fiches produits optimisées et campagnes automatisées.",
    badges: ["E-commerce", "SEO"],
    metrics: [
      { label: "Ventes 30 jours", value: "+182%" },
      { label: "Commande moyenne", value: "+68€" },
    ],
    liveUrl: "https://lumen.example.com",
    caseStudyUrl: "/portfolio/lumen-cosmetics",
  },
  {
    slug: "nova-crm",
    title: "Nova CRM",
    tagline: "Plateforme CRM simple pour une équipe commerciale B2B.",
    status: "PLANNED",
    impact: "Prototype adopté par 15 testeurs",
    stack: ["CRM", "Application web", "Support continu"],
    thumbnail: "/assets/projects/nova-cover.jpg",
    description:
      "Prototype cliquable et espace client prêts en 2 semaines pour valider le projet en comité.",
    badges: ["Prototype", "Accompagnement humain"],
    metrics: [
      { label: "Testeurs impliqués", value: "15" },
      { label: "Cycle de signature", value: "-60%" },
    ],
    caseStudyUrl: "/portfolio/nova-crm",
  },
];
