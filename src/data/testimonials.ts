export type Testimonial = {
  author: string;
  role: string;
  quote: string;
  rating: number;
  companyLogo?: string;
  source?: "LinkedIn" | "Google" | "Site";
  link?: string;
};

export const testimonials: Testimonial[] = [
  {
    author: "Emma Lefèvre",
    role: "CEO · FlowOps",
    quote:
      "Tristan a livré un MVP complet en un mois avec analytics live et onboarding automatisé. Nous avons signé nos 3 premiers clients avant même la V1.",
    rating: 5,
    companyLogo: "/assets/clients/flowops.svg",
    source: "LinkedIn",
  },
  {
    author: "Lucas Martin",
    role: "Head of Growth · Lumen",
    quote:
      "La refonte headless a doublé notre taux de conversion. Les automatisations nous font gagner 6h par semaine sur les campagnes.",
    rating: 5,
    companyLogo: "/assets/clients/lumen.svg",
    source: "Google",
  },
  {
    author: "Sofia Jimenez",
    role: "COO · Nova Labs",
    quote:
      "Le portail client est un game changer : DevOps, support et reporting dans un seul dashboard, avec un chatbot IA qui connaît notre produit.",
    rating: 5,
    companyLogo: "/assets/clients/novalabs.svg",
    source: "Site",
  },
];
