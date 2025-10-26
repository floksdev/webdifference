import type { Metadata } from "next";
import Link from "next/link";
import { automationPlays } from "@/data/automations";
import { events } from "@/data/events";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Automatisations & IA",
  description:
    "Workflows DocuSign, Stripe, Notion, Slack, IA copilote et reporting automatisé pour accélérer votre delivery.",
};

export default function AutomationsPage() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-24">
      <header className="space-y-6">
        <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/70">
          Automatisations & IA
        </div>
        <h1 className="text-3xl font-semibold sm:text-4xl md:text-5xl">
          La méthode Web Difference pour automatiser votre delivery
        </h1>
        <p className="max-w-3xl text-base text-white/70 md:text-lg">
          Signature électronique, facturation, onboarding, reporting et support IA
          déjà connectés à vos outils. Objectif : gagner du temps, fiabiliser
          l&apos;exécution et scaler vos process sans friction.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
        <div className="space-y-4 rounded-3xl border border-white/10 bg-[color:var(--color-surface)]/70 p-6">
          <h2 className="text-xl font-semibold text-white">
            Workflow complet en 5 minutes
          </h2>
          <p className="text-sm text-white/70">
            Démonstration express : on part d&apos;un brief Notion, on signe via DocuSign,
            on facture sur Stripe, on ouvre un espace client Supabase et on connecte
            un chatbot IA. Le tout en un seul run Zapier.
          </p>
          <div className="aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40">
            <div className="flex h-full w-full items-center justify-center text-white/40">
              Vidéo démo à venir (Loom)
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-[color:var(--color-surface)]/70 p-6">
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">
            Check-list automation
          </h3>
          <ul className="space-y-3 text-sm text-white/75">
            <li>✔️ DocuSign + Stripe + Notion + Slack plug&play</li>
            <li>✔️ Webhooks Zapier / Make pour chaque étape projet</li>
            <li>✔️ Analytics Plausible + BigQuery mis à jour toutes les 2h</li>
            <li>✔️ Chatbot IA connecté à vos bases Notion / Git / FAQ</li>
          </ul>
          <Link
            href="/devis"
            className="inline-flex w-fit items-center rounded-full bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-secondary)] px-4 py-2 text-xs font-semibold uppercase text-white"
          >
            Activer ce workflow
          </Link>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {automationPlays.map((play) => (
          <article
            key={play.title}
            className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-[color:var(--color-surface)]/80 p-6"
          >
            <span className="text-2xl">{play.icon}</span>
            <h2 className="text-lg font-semibold text-white">{play.title}</h2>
            <p className="text-sm text-white/70">{play.summary}</p>
            <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.2em] text-white/55">
              {play.integrations.map((integration) => (
                <span
                  key={integration}
                  className="rounded-full border border-white/10 px-3 py-1"
                >
                  {integration}
                </span>
              ))}
            </div>
            <p className="text-xs text-white/60">{play.outcome}</p>
            {play.cta ? (
              <Link
                href={play.cta.href}
                className="mt-auto inline-flex text-xs font-semibold uppercase text-[color:var(--color-secondary)]"
              >
                {play.cta.label} →
              </Link>
            ) : null}
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-white/10 bg-[color:var(--color-surface)]/70 p-6">
        <h2 className="text-xl font-semibold text-white">
          Automatisations déclenchées après signature
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">J+0</p>
            <p className="mt-1 font-semibold text-white">Signature + paiement</p>
            <p className="mt-1 text-xs text-white/60">
              DocuSign + Stripe + génération facture PDF + Slack notif.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">J+0</p>
            <p className="mt-1 font-semibold text-white">Portail client</p>
            <p className="mt-1 text-xs text-white/60">
              Création espace Supabase, accès Notion, canal Slack dédié.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">J+1</p>
            <p className="mt-1 font-semibold text-white">Dashboard analytics</p>
            <p className="mt-1 text-xs text-white/60">
              Plausible + BigQuery + rapport Notion auto mis à jour.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">J+2</p>
            <p className="mt-1 font-semibold text-white">Chatbot IA</p>
            <p className="mt-1 text-xs text-white/60">
              Base de connaissances importée, prompts configurés, analytics usage.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-[1fr_1fr]">
        <div className="rounded-3xl border border-white/10 bg-[color:var(--color-surface)]/70 p-6">
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">
            Lives & workshops
          </h3>
          <ul className="mt-3 space-y-3 text-sm text-white/70">
            {events.map((event) => (
              <li key={event.slug} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                  {event.type} · {formatDate(event.scheduledAt)}
                </p>
                <p className="mt-1 text-sm font-semibold text-white">{event.name}</p>
                <p className="mt-1 text-xs text-white/60">{event.description}</p>
                <Link
                  href={event.ctaHref}
                  className="mt-2 inline-flex text-xs font-semibold uppercase text-[color:var(--color-secondary)]"
                >
                  {event.ctaLabel} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-white/10 bg-[color:var(--color-surface)]/70 p-6">
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">
            Envies spécifiques ?
          </h3>
          <p className="mt-3 text-sm text-white/70">
            On connecte vos outils internes (HubSpot, Salesforce, Linear, Github,
            etc.) via API. Chaque automatisation est documentée et monitorée.
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-flex w-fit items-center rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase text-white/80 transition hover:border-[color:var(--color-secondary)] hover:text-white"
          >
            Discuter d&apos;un workflow sur-mesure
          </Link>
        </div>
      </section>
    </section>
  );
}
