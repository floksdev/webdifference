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
    slug: "jwl-marketing",
    title: "JWL Marketing",
    tagline: "Site Vitrine/E-commerce + SEO + mail automatiques",
    status: "LIVE",
    impact: "Site performant et optimisé",
    stack: ["Site Vitrine", "E-commerce", "SEO", "Mail automatiques"],
    thumbnail: "/assets/main/projets/couverture-jwl.png",
    description:
      "Site vitrine et e-commerce avec optimisation SEO et automatisation des emails marketing.",
    badges: ["E-commerce", "SEO"],
    metrics: [
      { label: "Performance", value: "Optimisé" },
      { label: "SEO", value: "Actif" },
    ],
    liveUrl: "https://www.jwl-marketing.fr",
  },
  {
    slug: "greenbeamcraft",
    title: "GreenBeamCraft",
    tagline: "Site E-commerce + Configurateur produit et aperçu 2D/3D + Mail automatiques + Interface administrateur",
    status: "LIVE",
    impact: "E-commerce avec configurateur avancé",
    stack: ["E-commerce", "Configurateur 2D/3D", "Mail automatiques", "Interface admin"],
    thumbnail: "/assets/main/projets/couverture-gbc.png",
    description:
      "Site e-commerce avec configurateur de produit interactif, aperçu 2D/3D, automatisation des emails et interface d'administration complète.",
    badges: ["E-commerce", "Configurateur"],
    metrics: [
      { label: "Configurateur", value: "2D/3D" },
      { label: "Interface", value: "Admin complète" },
    ],
    liveUrl: "https://www.greenbeamcraft.com",
  },
  {
    slug: "portfolio-project",
    title: "Portfolio",
    tagline: "Réalisation sur-mesure pour mettre en valeur vos projets.",
    status: "LIVE",
    impact: "Design épuré et performant",
    stack: ["Site vitrine", "Design sur-mesure"],
    thumbnail: "/assets/main/projets/couverture-portfolio.png",
    description:
      "Site portfolio moderne et épuré pour présenter vos réalisations.",
    badges: ["Portfolio", "Design"],
    metrics: [
      { label: "Design", value: "Sur-mesure" },
      { label: "Performance", value: "Optimisé" },
    ],
    liveUrl: "https://www.tristan-wehrle.com",
  },
];
