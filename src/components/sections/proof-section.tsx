const proofPoints = [
  {
    label: "4.9/5",
    description: "note moyenne laissée par nos clients accompagnés sur la durée",
  },
  {
    label: "+120",
    description: "sites, boutiques et applications livrés sans jargon depuis 2018",
  },
  {
    label: "+68%",
    description: "de croissance constatée en moyenne 3 mois après la mise en ligne",
  },
];

const marketSignals = [
  "+325 000 sites créés chaque année en France",
  "+1 000 demandes mensuelles “site web” sur Codeur.com",
  "Votre secteur : vitrine, e-commerce, SaaS, SEO ou maintenance",
];

export function ProofSection() {
  return (
    <section className="border-t border-white/10 bg-[color:var(--color-background-strong)] py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6">
        <div className="grid gap-6 rounded-3xl border border-white/10 bg-[color:var(--color-surface)]/90 p-8 shadow-lg shadow-[rgba(108,99,255,0.18)] md:grid-cols-[1.2fr_1fr] md:items-center">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[color:var(--color-secondary)]/85">
              Preuves concrètes
            </p>
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Résultats mesurés, secteurs variés
            </h2>
            <p className="text-base text-white/70">
              Web Difference accompagne artisans, PME, startups, franchises ou
              indépendants avec la même méthode : vision claire, livrables
              rapides et optimisation continue.
            </p>
          </div>
          <div className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-[color:rgba(44,62,80,0.65)] p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                Vue secteur 2025
              </p>
              <div className="mt-4 flex items-end gap-3">
                {[60, 80, 100].map((height, index) => (
                  <div key={height} className="flex flex-1 flex-col items-center gap-2">
                    <div
                      className="w-full max-w-[32px] rounded-full bg-gradient-to-t from-[color:var(--color-primary)] to-[color:var(--color-secondary)]"
                      style={{ height }}
                      aria-hidden="true"
                    />
                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/55">
                      {["Sites", "Boutiques", "Apps"][index]}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-white/60">
                Données indicatives : volume de projets réalisés pour nos clients.
              </p>
            </div>
            <ul className="space-y-3 text-sm text-white/70">
              {marketSignals.map((signal) => (
                <li
                  key={signal}
                  className="flex items-start gap-3 rounded-2xl bg-[color:rgba(0,224,255,0.12)]/80 px-4 py-3"
                >
                  <span className="mt-0.5 h-2 w-2 rounded-full bg-[color:var(--color-secondary)]" />
                  <span>{signal}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {proofPoints.map((point) => (
            <div
              key={point.label}
              className="rounded-3xl border border-white/10 bg-gradient-to-br from-[color:rgba(108,99,255,0.24)] via-[color:rgba(0,224,255,0.12)] to-[color:rgba(108,99,255,0.18)] p-6 text-center"
            >
              <p className="text-4xl font-semibold text-white">{point.label}</p>
              <p className="mt-3 text-sm text-white/70">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
