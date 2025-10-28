import Link from "next/link";

const automations = [
  {
    title: "Devis & signature instantanés",
    description:
      "Questionnaire express, devis PDF, signature électronique et facturation déclenchés automatiquement.",
  },
  {
    title: "Onboarding client guidé",
    description:
      "Portail sécurisé avec checklist, documents partagés, notifications WhatsApp ou email et suivi en direct.",
  },
  {
    title: "Suivi des performances",
    description:
      "Tableaux de bord prêts : trafic, ventes, SEO, campagnes. Rapports clairs envoyés chaque semaine.",
  },
];

export function AutomationSection() {
  return (
    <section className="border-t border-white/10 bg-[color:var(--color-background-strong)] py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Automatisations visibles, valeur immédiate
            </h2>
            <p className="text-base text-white/70">
              Nous mettons en place les outils qui font gagner du temps à vos
              équipes et rassurent vos clients : rien à installer, tout est
              configuré pour vous.
            </p>
            <ul className="space-y-2 text-sm text-white/70">
              <li>• Workflow documenté : devis, signature, facturation</li>
              <li>• Notifications sur vos canaux préférés (WhatsApp, mail, Slack)</li>
              <li>• Rapports clairs, accessibles depuis votre portail client</li>
            </ul>
            <Link
              href="/automatisations"
              className="inline-flex w-fit items-center rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white/85 transition hover:border-[color:var(--color-secondary)] hover:text-white"
            >
              Voir comment ça fonctionne
            </Link>
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
