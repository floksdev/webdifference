import type { Metadata } from "next";
import Link from "next/link";
import { QuoteWizard } from "./_components/quote-wizard";
import { testimonials } from "@/data/testimonials";
import { formatDate } from "@/lib/utils";
import { events } from "@/data/events";

export const metadata: Metadata = {
  title: "Générateur de devis instantané",
  description:
    "Simulez votre projet, calculez un devis Next.js/Automation en temps réel et recevez une proposition signée en moins de 5 minutes.",
};

export default function QuotePage() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-24">
      <header className="space-y-6">
        <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/70">
          <span>Devis instantané</span>
          <span className="rounded-full bg-[color:rgba(113,221,174,0.15)] px-2 py-1 text-[10px] uppercase tracking-[0.4em] text-white/80">
            Bêta
          </span>
        </div>
        <h1 className="text-3xl font-semibold sm:text-4xl md:text-5xl">
          Générateur de devis automatisé
        </h1>
        <p className="max-w-3xl text-base text-white/70 md:text-lg">
          Formulaire multi-step ultra simple (Typeform) avec calcul en temps
          réel, scénarios de paiement (IBAN, Stripe, acompte), PDF automatisé et
          onboarding client. Sélectionnez votre scope, obtenez les coûts, puis
          recevez un devis signé électroniquement.
        </p>
      </header>

      <QuoteWizard />

      <section className="grid gap-6 md:grid-cols-3">
        {testimonials.slice(0, 3).map((testimonial) => (
          <article
            key={testimonial.author}
            className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-[color:var(--color-surface)]/80 p-6"
          >
            <p className="text-sm text-white/70">“{testimonial.quote}”</p>
            <div className="text-sm text-white/60">
              <p className="font-semibold text-white">{testimonial.author}</p>
              <p>{testimonial.role}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="grid gap-6 rounded-3xl border border-white/10 bg-[color:var(--color-surface)]/70 p-6 md:grid-cols-[1.1fr_1fr]">
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-white">
            Ce qui se passe après votre devis
          </h2>
          <ul className="space-y-2 text-sm text-white/75">
            <li>• PDF généré automatiquement avec signature DocuSign intégrée.</li>
            <li>• Lien de paiement Stripe ou IBAN instantané.</li>
            <li>• Onboarding automatisé : accès portail client, Slack, notion board.</li>
            <li>• Kick-off sous 24h avec roadmap & KPI pré-paramétrés.</li>
          </ul>
          <Link
            href="/contact"
            className="inline-flex w-fit items-center rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase text-white/80 transition hover:border-[color:var(--color-secondary)] hover:text-white"
          >
            Questions ? On en parle en 24h
          </Link>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">
            Lives & workshops à venir
          </h3>
          <ul className="space-y-3 text-sm text-white/75">
            {events.slice(0, 2).map((event) => (
              <li
                key={event.slug}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                  {event.type} · {formatDate(event.scheduledAt)}
                </p>
                <p className="mt-1 text-base font-semibold text-white">
                  {event.name}
                </p>
                <p className="mt-1 text-xs text-white/65">{event.description}</p>
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
      </section>
    </section>
  );
}
