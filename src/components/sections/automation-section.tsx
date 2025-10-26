import Link from "next/link";

const automations = [
  {
    title: "Signature & Facturation",
    description:
      "Flux DocuSign + Stripe : signature, paiement et facturation déclenchés automatiquement.",
  },
  {
    title: "Portail client personnalisé",
    description:
      "Workspace sécurisé pour partager fichiers, suivre l’avancement et chatter en direct.",
  },
  {
    title: "Monitoring & Analytics",
    description:
      "Dashboard temps réel : parcours client, estimation CA, leads et performances de vos funnels.",
  },
];

export function AutomationSection() {
  return (
    <section className="border-t border-white/10 bg-[color:var(--color-background-strong)] py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Automatisations & différenciation
            </h2>
            <p className="text-base text-white/70">
              Chaque projet est livré avec des workflows connectés (Zapier,
              Notion, Slack) et des IA copilotes intégrés. Objectif : gagner du
              temps, fiabiliser l&apos;exécution et scaler vos process.
            </p>
            <div className="rounded-3xl border border-white/10 bg-[color:var(--color-surface)] p-6 shadow-lg shadow-[rgba(0,224,255,0.1)]">
              <p className="text-sm uppercase tracking-[0.3em] text-white/50">
                Workflow live
              </p>
              <p className="mt-3 text-lg font-semibold text-white">
                Redesign d&apos;un site SaaS en 30 minutes chrono.
              </p>
              <p className="mt-2 text-sm text-white/70">
                Vidéo speedrun + board Notion + scénarios Zapier offerts.
              </p>
              <Link
                href="/automatisations"
                className="mt-4 inline-flex w-fit items-center rounded-full border border-white/20 px-5 py-3 text-sm font-semibold uppercase text-white/85 transition hover:border-[color:var(--color-secondary)] hover:text-white"
              >
                Voir la méthode
              </Link>
            </div>
          </div>
          <div className="space-y-6">
            {automations.map((automation) => (
              <div
                key={automation.title}
                className="rounded-3xl border border-white/10 bg-[color:var(--color-surface)]/90 p-6"
              >
                <h3 className="text-lg font-semibold">{automation.title}</h3>
                <p className="mt-2 text-sm text-white/70">
                  {automation.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
