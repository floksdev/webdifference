export type FaqItem = {
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    question: "Combien coûte un site ou une refonte ?",
    answer:
      "Nos projets démarrent à 2 900 € pour un site vitrine, 5 900 € pour un e-commerce et sont adaptés à votre périmètre. Un devis clair vous est envoyé immédiatement après le questionnaire.",
  },
  {
    question: "Quels sont les délais moyens ?",
    answer:
      "Prototype cliquable sous 3 jours, mise en ligne en 10 à 20 jours selon la complexité. Les projets plus ambitieux (SaaS ou app mobile) se planifient sur 4 à 8 semaines.",
  },
  {
    question: "Pourrai-je gérer mon site facilement ?",
    answer:
      "Oui. Vous recevez une formation vidéo, un guide écrit, un accès CMS et un espace client pour suivre chaque action. Nous pouvons aussi nous occuper de tout à votre place.",
  },
  {
    question: "Quelles garanties proposez-vous ?",
    answer:
      "Maintenance incluse 30 jours après la mise en ligne, garantie de correction des bugs, monitoring en continu et possibilité d’assistance 24/7 selon l’offre choisie.",
  },
  {
    question: "Travaillez-vous avec mon secteur d’activité ?",
    answer:
      "Web Difference accompagne artisans, TPE-PME, franchises, associations, startups et groupes. Notre avantage : un langage simple et un plan d’action adapté à chaque métier.",
  },
];
