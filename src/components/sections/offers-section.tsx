import Link from "next/link";

const offers = [
  {
    name: "Starter",
    price: "3 900€",
    description: "Site vitrine premium, automatisations essentielles.",
    items: [
      "Design sur-mesure",
      "CMS optimisé SEO",
      "Automatisation des leads",
      "Chatbot IA basique",
    ],
  },
  {
    name: "Premium",
    price: "7 900€",
    description: "SaaS ou e-commerce headless avec workflows avancés.",
    items: [
      "Prototype interactif",
      "Générateur de devis automatisé",
      "Portail client personnalisé",
      "Dashboard analytics",
    ],
  },
  {
    name: "Growth",
    price: "Sur devis",
    description: "Scale-up complet avec orchestrations IA et data.",
    items: [
      "IA copilote custom",
      "Observabilité temps réel",
      "Playbooks marketing automatisés",
      "Ops & monitoring délégué",
    ],
  },
];

export function OffersSection() {
  return (
    <section className="border-t border-white/10 bg-[color:var(--color-background-strong)] py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6">
        <div className="flex flex-col gap-4 text-center">
          <h2 className="text-3xl font-semibold sm:text-4xl">
            Offres & services
          </h2>
          <p className="text-base text-white/70">
            Mixez nos packs Starter, Premium, Growth ou créez votre combo idéal
            via un wizard UX dédié.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {offers.map((offer) => (
            <div
              key={offer.name}
              className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-[color:var(--color-surface)] p-6 text-left shadow-sm shadow-[rgba(108,99,255,0.12)]"
            >
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-white/50">
                  {offer.name}
                </p>
                <p className="mt-3 text-3xl font-semibold text-white">
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
                href="/offres"
                className="mt-auto inline-flex w-fit items-center rounded-full border border-white/20 px-4 py-2 text-sm font-semibold uppercase text-white/85 transition hover:border-[color:var(--color-secondary)] hover:text-white"
              >
                Créer mon offre idéale
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
