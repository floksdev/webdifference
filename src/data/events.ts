export type EventItem = {
  slug: string;
  name: string;
  scheduledAt: string;
  description: string;
  type: "Live" | "Workshop" | "Replay";
  ctaLabel: string;
  ctaHref: string;
  replayUrl?: string;
};

export const events: EventItem[] = [
  {
    slug: "webinar-automation-24h",
    name: "Automation 24h : de la signature au reporting",
    scheduledAt: "2025-03-12T18:00:00+01:00",
    description:
      "Demo live du générateur de devis, DocuSign instantané et portail client personnalisé.",
    type: "Live",
    ctaLabel: "Réserver ma place",
    ctaHref: "https://cal.com/tristan/web-difference-live",
  },
  {
    slug: "workshop-differenciation",
    name: "Workshop différenciation pour SaaS",
    scheduledAt: "2025-04-04T09:30:00+02:00",
    description:
      "Session interactive pour cadrer un scrollytelling, un stack automation et un growth dashboard.",
    type: "Workshop",
    ctaLabel: "Télécharger l'agenda",
    ctaHref: "/ressources/workshops/differenciation.pdf",
  },
  {
    slug: "replay-ai-chatbot",
    name: "Replay · Construire un chatbot IA pour son support",
    scheduledAt: "2024-11-10T17:00:00+01:00",
    description:
      "Comment brancher OpenAI + Notion + Slack pour automatiser 60% des réponses clients.",
    type: "Replay",
    ctaLabel: "Regarder le replay",
    ctaHref: "https://videos.webdifference.app/replay/chatbot-support",
    replayUrl: "https://videos.webdifference.app/replay/chatbot-support",
  },
];
