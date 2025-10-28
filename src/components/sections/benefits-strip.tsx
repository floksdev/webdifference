const benefits = [
  {
    title: "Suivi en temps réel",
    description: "Suivez l’avancement du projet et recevez un lien d'accès dès le départ.",
    icon: "🔗",
  },
  {
    title: "Rapidité garantie",
    description: "Projet rendu avant la date prévue ou réduction immédiate sur le solde.",
    icon: "⏱️",
  },
  {
    title: "Fiabilité totale",
    description: "100 % de clients satisfaits, accompagnement humain et suivi sur-mesure.",
    icon: "✅",
  },
];

export function BenefitsStrip() {
  return (
    <section className="border-t border-white/10 bg-[color:var(--color-background-strong)] py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6">
        <div className="flex flex-col gap-2 text-center">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Mais où est la différence ?
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[color:var(--color-surface)]/85 p-5 shadow-[0_16px_40px_rgba(0,0,0,0.28)] transition-transform hover:-translate-y-1"
            >
              <div className="absolute -right-6 -top-10 h-24 w-24 rounded-full bg-gradient-to-br from-[#6C63FF] to-[#00E0FF] opacity-30 blur-2xl" />
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[#6C63FF] to-[#00E0FF] text-lg">
                {benefit.icon}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-white">
                {benefit.title}
              </h3>
              <p className="mt-2 text-sm text-white/70">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
