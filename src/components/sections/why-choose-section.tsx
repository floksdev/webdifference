import Link from "next/link";

const reasons = [
  {
    title: "Accompagnement humain, sans jargon",
    description:
      "Vous parlez objectifs, nous traduisons en actions. Chaque étape est expliquée avec des mots simples et des vidéos de suivi.",
  },
  {
    title: "Automatisation au service du temps gagné",
    description:
      "Devis instantané, signature électronique, notifications WhatsApp et portail client : tout est prêt dès le jour 1.",
  },
  {
    title: "Transparence et résultats mesurables",
    description:
      "Budget, délais, indicateurs et plan d’animation sont partagés dans un espace unique. Vous savez toujours où en est votre projet.",
  },
  {
    title: "Expérience complète",
    description:
      "Site vitrine, e-commerce, SaaS, SEO, maintenance ou bug fix : une seule équipe pour tout piloter avec des partenaires validés.",
  },
];

export function WhyChooseSection() {
  return (
    <section className="border-t border-white/10 bg-[color:var(--color-background-strong)] py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6">
        <div className="flex flex-col gap-4 text-center">
          <span className="mx-auto inline-flex rounded-full bg-[color:rgba(113,221,174,0.2)] px-4 py-1 text-xs font-semibold text-white/80">
            Pourquoi Web Difference ?
          </span>
          <h2 className="text-3xl font-semibold sm:text-4xl">
            La sérénité d&apos;un partenaire unique
          </h2>
          <p className="text-base text-white/70">
            Nous combinons expertise technique, pédagogie et automatisations
            intelligentes pour livrer vite et durablement.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="rounded-3xl border border-white/10 bg-[color:var(--color-surface)]/85 p-6 text-left shadow-sm shadow-[rgba(113,221,174,0.15)]"
            >
              <h3 className="text-lg font-semibold text-[#1C1C1C]">
                {reason.title}
              </h3>
              <p className="mt-2 text-sm text-[#1C1C1C]/80">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/devis"
            className="inline-flex items-center rounded-full bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-secondary)] px-6 py-3 text-sm font-semibold text-slate-900 transition hover:shadow-lg hover:shadow-[rgba(113,221,174,0.25)]"
          >
            Obtenir un devis express
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/85 transition hover:border-[color:var(--color-secondary)] hover:text-white"
          >
            Discuter de vos besoins
          </Link>
        </div>
      </div>
    </section>
  );
}
