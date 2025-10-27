const benefits = [
  {
    title: "Résultats mesurables",
    description: "+42% de croissance moyenne sous 10 jours après mise en ligne.",
    icon: "📈",
  },
  {
    title: "Accompagnement humain",
    description: "Un interlocuteur unique + tutoriels vidéo pour chaque étape.",
    icon: "🤝",
  },
  {
    title: "Automatisation totale",
    description: "Devis, signature, onboarding et suivi client gérés pour vous.",
    icon: "⚡️",
  },
];

export function BenefitsStrip() {
  return (
    <section className="border-t border-white/10 bg-[color:var(--color-background-strong)] py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6">
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
