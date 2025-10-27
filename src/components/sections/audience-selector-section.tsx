import Link from "next/link";

const audiences = [
  {
    label: "Artisan · TPE locale",
    description: "Boostez votre visibilité et prenez des rendez-vous en ligne.",
    primaryCta: {
      href: "/devis?type=vitrine",
      label: "Obtenir mon devis vitrine",
    },
    secondaryCta: {
      href: "#offres-site-vitrine",
      label: "Voir l’offre dédiée",
    },
    highlight: "Site vitrine + SEO local",
  },
  {
    label: "PME · Retail · E-commerce",
    description: "Lancez ou relancez votre boutique en ligne sans stress.",
    primaryCta: {
      href: "/devis?type=ecommerce",
      label: "Chiffrer ma boutique",
    },
    secondaryCta: {
      href: "#offres-ecommerce",
      label: "Découvrir les packs e-commerce",
    },
    highlight: "Tunnel optimisé + campagnes prêtes",
  },
  {
    label: "Startup · Projet SaaS / App",
    description: "Prototype, développement et suivi complet avec une seule équipe.",
    primaryCta: {
      href: "/devis?type=saas",
      label: "Planifier mon prototype",
    },
    secondaryCta: {
      href: "#offres-saas",
      label: "Voir l’accompagnement SaaS",
    },
    highlight: "Prototype offert 72h + roadmap produit",
  },
];

export function AudienceSelectorSection() {
  return (
    <section
      className="border-t border-white/10 bg-[color:var(--color-background-strong)] py-20"
      aria-labelledby="audience-selector-title"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6">
        <div className="flex flex-col gap-3 text-center">
          <span className="mx-auto inline-flex rounded-full bg-[color:rgba(0,224,255,0.18)] px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-white/85">
            Choisissez votre parcours
          </span>
          <h2
            id="audience-selector-title"
            className="text-3xl font-semibold sm:text-4xl text-white"
          >
            Vous êtes plutôt…
          </h2>
          <p className="text-base text-white/70">
            Nous adaptons notre accompagnement et nos automatisations à votre
            réalité métier. Sélectionnez votre profil pour aller à l’essentiel.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {audiences.map((audience) => (
            <article
              key={audience.label}
              className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-[color:var(--color-surface)]/85 p-6 shadow-[0_18px_48px_rgba(0,0,0,0.25)]"
            >
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[color:var(--color-secondary)]/85">
                  {audience.label}
                </p>
                <p className="mt-3 text-lg font-semibold text-white">
                  {audience.highlight}
                </p>
                <p className="mt-2 text-sm text-white/70">{audience.description}</p>
              </div>
              <div className="flex flex-col gap-2">
                <Link
                  href={audience.primaryCta.href}
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#6C63FF] to-[#00E0FF] px-5 py-2.5 text-sm font-semibold uppercase text-white transition hover:shadow-lg hover:shadow-[rgba(0,224,255,0.25)]"
                >
                  {audience.primaryCta.label}
                </Link>
                <Link
                  href={audience.secondaryCta.href}
                  className="inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.3em] text-white/80 transition hover:border-[color:var(--color-secondary)] hover:text-white"
                >
                  {audience.secondaryCta.label}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
