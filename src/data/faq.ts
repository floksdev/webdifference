export type FaqItem = {
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    question: "Combien coûte un site ou une refonte ?",
    answer:
      "Nos projets démarrent à 390 € et sont adaptés à votre périmètre. Un devis clair vous est envoyé immédiatement après notre premier rendez-vous.",
  },
  {
    question: "Quels sont les délais moyens ?",
    answer:
      "Recevez un lien d'accès à votre nouveau site dès le premier jour et suivez en temps réel l'avancée du projet, mise en ligne en 5 à 20 jours selon la complexité. Les projets plus ambitieux (SaaS ou app mobile) se planifient sur 2 à 6 semaines.",
  },
  {
    question: "Pourrai-je gérer mon site facilement ?",
    answer:
      "Oui. Votre site est facile à gérer et peut être administré via un accès CMS. Vous pouvez aussi choisir de ne rien gérer grâce à notre service de maintenance.",
  },
  {
    question: "Quelles garanties proposez-vous ?",
    answer:
      "Après la mise en ligne, nous restons à vos côtés. Vous bénéficiez de 30 jours de maintenance incluse, d'une garantie de correction des bugs et d'une surveillance continue du site. Une assistance étendue est disponible selon votre offre.",
  },
  {
    question: "Travaillez-vous avec mon secteur d'activité ?",
    answer:
      "Oui. Nous travaillons avec des structures de toutes tailles et de tous secteurs : artisans, TPE-PME, franchises, associations, startups et groupes. Notre différence : parler votre langage et construire un plan d'action réellement adapté à votre activité.",
  },
];
