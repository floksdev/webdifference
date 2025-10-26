export type ArticleSummary = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  tags: string[];
  readTime: string;
  publishedAt: string;
};

export const articles: ArticleSummary[] = [
  {
    slug: "pourquoi-creer-site-vitrine-2025",
    title: "Pourquoi créer un site vitrine en 2025 ?",
    summary:
      "Les bonnes raisons d'avoir une présence en ligne claire, avec des exemples simples pour artisans, freelances et PME.",
    category: "Site vitrine",
    tags: ["Création site web", "PME"],
    readTime: "6 min",
    publishedAt: "2025-02-04",
  },
  {
    slug: "checklist-agence-web",
    title: "Comment choisir son agence web : la checklist simplifiée",
    summary:
      "10 questions à poser avant de signer : budget, délais, maintenance, SEO, accompagnement.",
    category: "Guide agence",
    tags: ["Agence web", "Checklist"],
    readTime: "6 min",
    publishedAt: "2025-01-18",
  },
  {
    slug: "reussir-refonte-sans-stress",
    title: "Réussir sa refonte web sans stress",
    summary:
      "Plan d'action en 5 étapes pour garder vos contenus, améliorer la conversion et rassurer vos équipes.",
    category: "Refonte",
    tags: ["Refonte site", "Organisation"],
    readTime: "7 min",
    publishedAt: "2025-01-05",
  },
  {
    slug: "seo-intelligent-concurrents",
    title: "Le SEO intelligent : 5 astuces pour dépasser vos concurrents",
    summary:
      "Des actions simples à mettre en place chaque semaine pour remonter sur Google sans jargon technique.",
    category: "SEO",
    tags: ["SEO", "Visibilité"],
    readTime: "5 min",
    publishedAt: "2024-12-20",
  },
];
