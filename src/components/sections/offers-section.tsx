import Link from "next/link";

type Offer = {
  name: string;
  price: string;
  description: string;
  items: string[];
};

const offers: Offer[] = [
  {
    name: "Site vitrine",
    price: "À partir de 2 900 €",
    description:
      "Valorisez votre activité, attirez plus de demandes et rassurez vos prospects dès la première visite.",
    items: [
      "Structure claire : accueil, services, avis, contact",
      "SEO local optimisé et formulaires connectés",
      "Formation vidéo pour être autonome",
    ],
  },
  {
    name: "E-commerce",
    price: "À partir de 5 900 €",
    description:
      "Vendez en ligne simplement avec un parcours d’achat fluide, des paiements sécurisés et des campagnes prêtes.",
    items: [
      "Catalogue modulable et fiches produits SEO",
      "Tunnel de commande optimisé mobile",
      "Email marketing automatisé dès le lancement",
    ],
  },
  {
    name: "Refonte & optimisation",
    price: "Sur devis",
    description:
      "Modernisez votre image, améliorez la vitesse et augmentez votre conversion sans repartir de zéro.",
    items: [
      "Audit complet UX, SEO et technique",
      "Roadmap claire : priorités, gains, budget",
      "Mise en ligne sans interruption de service",
    ],
  },
  {
    name: "SaaS & application",
    price: "Sur devis",
    description:
      "Développez votre projet innovant avec une équipe qui gère design, produit, développement et suivi.",
    items: [
      "Prototype cliquable offert",
      "Parcours utilisateur testé en conditions réelles",
      "Monitoring et support utilisateurs inclus",
    ],
  },
  {
    name: "SEO & Google Ads",
    price: "Pack mensuel dès 790 €",
    description:
      "Soyez visible sur vos mots-clés et transformez vos visites en opportunités avec un plan d’actions simple.",
    items: [
      "Étude de mots-clés et contenu guidé",
      "Optimisations techniques et netlinking",
      "Rapports mensuels clairs et digestes",
    ],
  },
  {
    name: "Maintenance & bug fix",
    price: "À partir de 190 €/mois",
    description:
      "Sécurisez votre site, corrigez les bugs et bénéficiez d’un support réactif par un interlocuteur unique.",
    items: [
      "Surveillance 24/7 et sauvegardes quotidiennes",
      "Corrections garanties sous 24h ouvrées",
      "Améliorations régulières et coaching",
    ],
  },
];

export function OffersSection() {
  return (
    <section className="border-t border-white/10 bg-[color:var(--color-background-strong)] py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6">
        <div className="flex flex-col gap-4 text-center">
          <h2 className="text-3xl font-semibold sm:text-4xl">Vous cherchez…</h2>
          <p className="text-base text-white/70">
            Sélectionnez votre besoin : nous avons le plan d’action, le budget
            et l’équipe prêts à démarrer.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {offers.map((offer) => (
            <div
              key={offer.name}
              className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-[color:var(--color-surface)] p-6 text-left shadow-sm shadow-[rgba(108,99,255,0.12)]"
            >
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-[color:var(--color-secondary)]/85">
                  {offer.name}
                </p>
                <p className="mt-3 text-2xl font-semibold text-white">
                  {offer.price}
                </p>
                <p className="mt-2 text-sm text-white/70">
                  {offer.description}
                </p>
              </div>
              <ul className="space-y-2 text-sm text-white/70">
                {offer.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
              <Link
                href="/devis"
                className="mt-auto inline-flex w-fit items-center rounded-full border border-white/20 px-4 py-2 text-sm font-semibold uppercase text-white/85 transition hover:border-[color:var(--color-secondary)] hover:text-white"
              >
                Obtenir un devis express
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
