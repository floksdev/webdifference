import { ReactNode } from "react";
import Link from "next/link";

type Offer = {
  id: string;
  name: string;
  tagline: string;
  price: string;
  description: string;
  items: string[];
  badge: string;
  accent: string;
  icon: ReactNode;
  ctaHint: string;
};

const offers: Offer[] = [
  {
    id: "offres-site-vitrine",
    name: "Site vitrine",
    tagline: "Idéal artisans & TPE",
    price: "À partir de 2 900 €",
    description:
      "Valorisez votre activité, attirez plus de demandes et rassurez vos prospects dès la première visite.",
    badge: "Mise en ligne < 4 semaines",
    items: [
      "Structure claire : accueil, services, avis, contact",
      "SEO local optimisé et formulaires connectés",
      "Formation vidéo pour être autonome",
    ],
    accent: "from-emerald-400/35 via-indigo-500/25 to-purple-500/25",
    icon: (
      <svg
        viewBox="0 0 32 32"
        className="h-10 w-10 text-emerald-300"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="4.2" y="6.2" width="23.6" height="18.6" rx="2.8" />
        <path d="M4.2 12.8h23.6" />
        <circle cx="9.2" cy="9.5" r="0.9" fill="currentColor" stroke="none" />
        <circle cx="13" cy="9.5" r="0.9" fill="currentColor" stroke="none" />
        <path d="M10.7 17.1h10.6m-10.6 4.5h6.4" />
      </svg>
    ),
    ctaHint: "en 60 s",
  },
  {
    id: "offres-ecommerce",
    name: "E-commerce",
    tagline: "Boost ventes en ligne",
    price: "À partir de 5 900 €",
    description:
      "Vendez en ligne simplement avec un parcours d’achat fluide, des paiements sécurisés et des campagnes prêtes.",
    badge: "Lancement guidé",
    items: [
      "Catalogue modulable et fiches produits SEO",
      "Tunnel de commande optimisé mobile",
      "Email marketing automatisé dès le lancement",
    ],
    accent: "from-rose-500/30 via-orange-400/25 to-amber-400/20",
    icon: (
      <svg
        viewBox="0 0 32 32"
        className="h-10 w-10 text-orange-300"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M6.5 8.5h21l-2 9.8a3 3 0 0 1-3 2.4H11.5a3 3 0 0 1-3-2.4l-2-9.8Z" />
        <path d="M12.2 24.8h9.7" />
        <circle cx="12.5" cy="26.5" r="1.7" fill="currentColor" stroke="none" />
        <circle cx="22.5" cy="26.5" r="1.7" fill="currentColor" stroke="none" />
      </svg>
    ),
    ctaHint: "coaching inclus",
  },
  {
    id: "offres-refonte",
    name: "Refonte & optimisation",
    tagline: "Relook & performances",
    price: "Sur devis",
    description:
      "Modernisez votre image, améliorez la vitesse et augmentez votre conversion sans repartir de zéro.",
    badge: "Audit complet offert",
    items: [
      "Audit complet UX, SEO et technique",
      "Roadmap claire : priorités, gains, budget",
      "Mise en ligne sans interruption de service",
    ],
    accent: "from-indigo-400/35 via-blue-500/20 to-cyan-400/15",
    icon: (
      <svg
        viewBox="0 0 32 32"
        className="h-10 w-10 text-sky-300"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M6.5 7h19a1.5 1.5 0 0 1 1.5 1.5V23a1.5 1.5 0 0 1-1.5 1.5H6.5A1.5 1.5 0 0 1 5 23V8.5A1.5 1.5 0 0 1 6.5 7Z" />
        <path d="M10 11.5h12M10 16h12M10 20.5h7" />
      </svg>
    ),
    ctaHint: "roadmap 48 h",
  },
  {
    id: "offres-saas",
    name: "SaaS & application",
    tagline: "Prototype 72h + suivi",
    price: "Sur devis",
    description:
      "Développez votre projet innovant avec une équipe qui gère design, produit, développement et suivi.",
    badge: "Design system compris",
    items: [
      "Prototype cliquable offert",
      "Parcours utilisateur testé en conditions réelles",
      "Monitoring et support utilisateurs inclus",
    ],
    accent: "from-fuchsia-500/35 via-indigo-500/25 to-slate-500/20",
    icon: (
      <svg
        viewBox="0 0 32 32"
        className="h-10 w-10 text-purple-300"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="5.5" y="6.5" width="21" height="19" rx="2.5" />
        <path d="M9.5 11.5h13M9.5 16h7M9.5 20.5h5" />
        <circle cx="23" cy="16" r="2.5" />
      </svg>
    ),
    ctaHint: "atelier offert",
  },
  {
    id: "offres-seo",
    name: "SEO & Google Ads",
    tagline: "Visibilité durable",
    price: "Pack mensuel dès 790 €",
    description:
      "Soyez visible sur vos mots-clés et transformez vos visites en opportunités avec un plan d’actions simple.",
    badge: "Pilotage mensuel",
    items: [
      "Étude de mots-clés et contenu guidé",
      "Optimisations techniques et netlinking",
      "Rapports mensuels clairs et digestes",
    ],
    accent: "from-lime-400/35 via-emerald-400/20 to-teal-400/15",
    icon: (
      <svg
        viewBox="0 0 32 32"
        className="h-10 w-10 text-lime-300"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M7 23.5c2.4-5.4 6-8.1 13-8.1" />
        <path d="M20.5 5.5v8h8" />
        <path d="M20 10.7 26.5 5" />
        <path d="M9 26.5h18" />
      </svg>
    ),
    ctaHint: "tableau de bord",
  },
  {
    id: "offres-maintenance",
    name: "Maintenance & bug fix",
    tagline: "Sérénité & support",
    price: "À partir de 190 €/mois",
    description:
      "Sécurisez votre site, corrigez les bugs et bénéficiez d’un support réactif par un interlocuteur unique.",
    badge: "Support 24/7",
    items: [
      "Surveillance 24/7 et sauvegardes quotidiennes",
      "Corrections garanties sous 24h ouvrées",
      "Améliorations régulières et coaching",
    ],
    accent: "from-slate-400/35 via-slate-500/20 to-indigo-500/20",
    icon: (
      <svg
        viewBox="0 0 32 32"
        className="h-10 w-10 text-slate-200"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M6 12.5h20v6.5a8 8 0 0 1-8 8h-4a8 8 0 0 1-8-8v-6.5Z" />
        <path d="M12 12.5V10a4 4 0 0 1 8 0v2.5" />
        <path d="M16 19.5v3" />
      </svg>
    ),
    ctaHint: "sans engagement",
  },
];

export function OffersSection() {
  return (
    <section
      id="offres"
      className="border-t border-white/10 bg-[color:var(--color-background-strong)] py-24"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6">
        <div className="flex flex-col gap-4 text-center">
          <h2 className="text-3xl font-semibold sm:text-4xl text-white">
            Et qu&apos;est-ce que vous avez à me proposer&nbsp;?
          </h2>
        </div>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {offers.map((offer) => (
            <div
              key={offer.id}
              id={offer.id}
              className="group relative flex flex-col gap-6 rounded-3xl border border-white/10 bg-[color:var(--color-surface)]/95 p-8 text-left shadow-[0_22px_60px_rgba(10,16,40,0.35)] transition duration-200 hover:-translate-y-1 hover:border-[color:var(--color-secondary)]/60"
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br px-6 pb-8 pt-6 shadow-inner shadow-black/20">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${offer.accent}`}
                  aria-hidden
                />
                <div className="absolute -right-8 -top-10 h-28 w-28 rounded-full bg-white/10 blur-3xl" />
                <div className="relative flex items-start justify-between">
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-semibold uppercase text-white/80">
                      {offer.tagline}
                    </span>
                    <h3 className="text-2xl font-semibold text-white">
                      {offer.name}
                    </h3>
                    <p className="text-sm text-white/75">{offer.price}</p>
                  </div>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 backdrop-blur">
                    {offer.icon}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-sm text-white/70">{offer.description}</p>
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase text-white/70">
                  <span className="inline-block h-2 w-2 rounded-full bg-[color:var(--color-secondary)]" />
                  {offer.badge}
                </span>
              </div>
              <ul className="space-y-2 text-sm text-white/75">
                {offer.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-[2px] inline-flex h-4 w-4 items-center justify-center rounded-full bg-[color:var(--color-secondary)]/80 text-[10px] font-bold text-slate-950">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/devis"
                className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-[color:var(--color-secondary)] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[color:var(--color-secondary)]/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-secondary)]"
              >
                Obtenir un devis express
                <span className="text-xs font-medium text-white/70">
                  {offer.ctaHint}
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
