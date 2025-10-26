export type AutomationPlay = {
  title: string;
  summary: string;
  icon: string;
  integrations: string[];
  outcome: string;
  cta?: {
    label: string;
    href: string;
  };
};

export const automationPlays: AutomationPlay[] = [
  {
    title: "Signature & Facturation automatique",
    summary:
      "DocuSign + Stripe + Notion : facture, signature et onboarding déclenchés en moins de 5 minutes.",
    icon: "🧾",
    integrations: ["DocuSign", "Stripe", "Notion", "Slack"],
    outcome: "-80% de temps de closing, +100% de visibilité finance.",
    cta: { label: "Voir le workflow", href: "/automatisations#signature" },
  },
  {
    title: "Portail client augmenté",
    summary:
      "Portail sécurisée avec suivi projet, partage de fichiers, tickets et chatbot IA relié à votre base de connaissances.",
    icon: "🗂️",
    integrations: ["Supabase", "Clerk", "OpenAI", "Linear"],
    outcome: "Satisfaction client 4.9/5, 0 email perdu.",
  },
  {
    title: "Reporting growth temps réel",
    summary:
      "Plausible + BigQuery + Notion pour un cockpit growth qui s'actualise toutes les 2h.",
    icon: "📊",
    integrations: ["Plausible", "BigQuery", "Zapier", "Notion"],
    outcome: "+68% d'efficacité sur les décisions marketing.",
  },
];
