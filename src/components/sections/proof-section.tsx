export function ProofSection() {
  return (
    <section className="border-t border-white/10 bg-[color:var(--color-background-strong)] py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6">
        <div className="grid gap-6 rounded-3xl border border-white/10 bg-[color:var(--color-surface)]/90 p-8 shadow-lg shadow-[rgba(108,99,255,0.18)] md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div className="space-y-4">
            <p className="text-sm font-semibold text-[color:var(--color-secondary)]/85">
              Mais où est la différence ?
            </p>
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Une agence qui pense résultat, pédagogie et automatisation
            </h2>
            <ul className="space-y-3 text-base text-white/72">
              <li>
                <span className="font-semibold text-white">Livraison express :</span>{" "}
                maquette 72h, mise en ligne 10 jours, suivi 30 jours inclus.
              </li>
              <li>
                <span className="font-semibold text-white">Accompagnement humain :</span>{" "}
                un interlocuteur unique + tutoriels vidéo pour chaque étape.
              </li>
              <li>
                <span className="font-semibold text-white">Automatisation utile :</span>{" "}
                devis instantané, signature électronique, portail client et reporting live.
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-[color:rgba(44,62,80,0.65)] p-6">
              <p className="text-sm font-semibold text-white/80">
                Impact moyen observé
              </p>
              <div className="mt-4 grid gap-3">
                {[
                  { label: "Gain de visibilité SEO", value: "+62%" },
                  { label: "Conversions après refonte", value: "+48%" },
                  { label: "Temps d'onboarding client", value: "÷3" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-[rgba(12,22,33,0.6)] px-4 py-3 text-sm text-white/75"
                  >
                    <span>{item.label}</span>
                    <span className="font-semibold text-[color:var(--color-secondary)]">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-white/60">
                Données calculées sur 60 projets livrés entre 2023 et 2025.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-[rgba(0,224,255,0.12)]/80 px-4 py-5 text-sm text-white/75 shadow-inner shadow-[rgba(0,224,255,0.08)]">
              <p className="font-semibold text-white">
                “Grâce à la combinaison d’automatisations et d’un accompagnement humain,
                on garde le cap sur l’essentiel : faire gagner du temps et de la croissance à nos clients.”
              </p>
              <p className="mt-3 text-xs text-white/55">
                Tristan · fondateur Web Difference
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
