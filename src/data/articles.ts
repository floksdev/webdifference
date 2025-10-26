export type ArticleSummary = {
  slug: string;
  title: string;
  summary: string;
  category: "Automation" | "Branding" | "Product" | "SEO";
  tags: string[];
  readTime: string;
  publishedAt: string;
};

export const articles: ArticleSummary[] = [
  {
    slug: "experience-differenciante-2025",
    title: "Construire une expérience différenciante en 2025",
    summary:
      "Framework en 4 étapes pour lancer un produit digital mémorable : IA, scrollytelling, automation et analytics.",
    category: "Branding",
    tags: ["Design System", "Storytelling"],
    readTime: "8 min",
    publishedAt: "2025-01-15",
  },
  {
    slug: "automation-onboarding-express",
    title: "Automatiser l'onboarding client de A à Z",
    summary:
      "Stack tool + workflows Notion, Slack, DocuSign et Stripe pour signer, facturer et lancer un projet en 24h.",
    category: "Automation",
    tags: ["Zapier", "DocuSign", "Stripe"],
    readTime: "6 min",
    publishedAt: "2024-12-02",
  },
  {
    slug: "seo-ia-combo-gagnant",
    title: "SEO technique + IA : combo gagnant",
    summary:
      "Comment combiner content automation, schémas, et scoring IA pour booster la génération de leads.",
    category: "SEO",
    tags: ["IA", "Content Ops"],
    readTime: "7 min",
    publishedAt: "2024-10-18",
  },
];
