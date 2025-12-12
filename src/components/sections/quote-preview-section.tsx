import Link from "next/link";

const journeySteps = [
  {
    title: "Question express",
    description:
      "60 secondes pour préciser votre besoin (site, e-commerce, SaaS, SEO ou maintenance).",
    cta: "Formulaire simple, pas de jargon.",
  },
  {
    title: "Prototype & plan d’action",
    description:
      "Maquette ou checklist de refonte livrée sous 72 h avec budget, délais et priorités.",
    cta: "Vous validez avant de lancer.",
  },
  {
    title: "Production & mise en ligne",
    description:
      "Développement, contenus, SEO et intégrations traités en suivant un calendrier transparent.",
    cta: "Mise en ligne rapide et sécurisée.",
  },
  {
    title: "Suivi & croissance",
    description:
      "Optimisation continue, A/B tests, campagnes SEO/Ads et maintenance 24/7 selon votre pack.",
    cta: "Vous gardez la main, nous pilotons.",
  },
];

const highlights = [
  { label: "Prototype offert", value: "72 h" },
  { label: "Mise en ligne moyenne", value: "10 jours" },
  { label: "Suivi et maintenance", value: "inclus 30 jours" },
];

export function QuotePreviewSection() {
  return (
    <section className="border-t border-white/10 bg-[color:var(--color-background-strong)] py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-14 px-6">
        <div className="grid gap-10 rounded-3xl border border-white/10 bg-[color:var(--color-surface)]/85 p-8 shadow-lg shadow-[rgba(113,221,174,0.18)] lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-4">
            <span className="inline-flex rounded-full bg-[color:rgba(113,221,174,0.14)] px-4 py-1 text-xs font-semibold text-[#1C1C1C]/80">
              Parcours client simple
            </span>
            <h2 className="text-3xl font-semibold sm:text-4xl text-[#1C1C1C]">
              Votre projet en 4 étapes claires
            </h2>
            <p className="text-base text-[#1C1C1C]/80">
              Définissez votre projet en 60 secondes, recevez une maquette sous
              3 jours, mettez en ligne en 10 jours, profitez d&apos;un suivi
              continu 30 jours et plus. 100% automatisé, 100% humain.
            </p>
            <Link
              href="/devis"
              className="inline-flex w-fit items-center rounded-full border border-[#1C1C1C]/20 px-5 py-3 text-sm font-semibold text-[#1C1C1C] transition hover:border-[#1C1C1C] hover:bg-[#1C1C1C]/10"
            >
              Lancer le devis express
            </Link>
          </div>
          <div className="grid gap-4">
            {journeySteps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-2xl border border-white/10 bg-[color:rgba(28,28,28,0.75)] p-4"
                >
                  <div className="flex items-baseline justify-between">
                    <p className="text-sm font-semibold text-white/70">
                      {index + 1}
                    </p>
                    <p className="text-xs text-white/60">{step.cta}</p>
                  </div>
                <p className="mt-2 text-lg font-semibold text-white">
                  {step.title}
                </p>
                <p className="mt-2 text-sm text-white/70">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-white">
              Automatisation visible et rassurante
            </h3>
            <p className="text-base text-white/70">
              Une fois le questionnaire envoyé, vous recevez
              automatiquement votre devis PDF, un récap WhatsApp, l’accès au
              portail client et le planning partagé. Chaque action est suivie
              par des notifications claires.
            </p>
            <ul className="space-y-2 text-sm text-white/70">
              <li>• Devis instantané avec trois scénarios de budget</li>
              <li>• Signature électronique sécurisée &amp; facturation simple</li>
              <li>• Tableaux de bord live : SEO, ventes, trafic et leads</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[color:rgba(113,221,174,0.35)] via-[color:rgba(255,255,255,0.18)] to-[color:rgba(113,221,174,0.22)] p-6 text-center shadow-[0_20px_60px_rgba(0,0,0,0.28)]">
            <p className="text-sm text-white/65">
              Timeline type
            </p>
            <div className="mt-6 grid gap-4">
              {highlights.map((item) => (
                <div key={item.label}>
                  <p className="text-xs text-white/55">
                    {item.label}
                  </p>
                  <p className="text-2xl font-semibold text-white">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-white/70">
              Votre responsable projet reste disponible par WhatsApp, mail ou
              visio selon vos préférences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
