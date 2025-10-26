import type { Metadata } from "next";
import Link from "next/link";
import { PortfolioGallery } from "./_components/portfolio-gallery";
import { testimonials } from "@/data/testimonials";
import { QuoteSummary } from "@/app/devis/_components/quote-summary";
import { projectQuoteSchema } from "@/lib/schemas/project-quote";
import { computeQuotePricing } from "@/lib/pricing-engine";

export const metadata: Metadata = {
  title: "Portfolio & Proof of Work",
  description:
    "Découvrez des projets SaaS, e-commerce et automation livrés par Web Difference : stats d'impact, stack technique et demos live.",
};

const sampleQuote = computeQuotePricing(
  projectQuoteSchema.parse({
    projectType: "site-vitrine",
    designLevel: "sur-mesure",
    functionalScope: ["automations", "payments"],
    marketingSupport: true,
    deadline: undefined,
    budgetRange: { min: 6000, max: 10000 },
    paymentPreference: "IBAN",
    subscriptionModel: { enabled: false },
  }),
);

export default function PortfolioPage() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-24">
      <header className="space-y-6">
        <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/70">
          Réalisations live
        </div>
        <h1 className="text-3xl font-semibold sm:text-4xl md:text-5xl">
          Portfolio & Proof of Work
        </h1>
        <p className="max-w-3xl text-base text-white/70 md:text-lg">
          Galerie filtrable, stats d&apos;impact, badge “Projet en cours”, démos en
          direct et outils open source pour tester la méthode Web Difference.
        </p>
      </header>

      <PortfolioGallery />

      <section className="grid gap-6 rounded-3xl border border-white/10 bg-[color:var(--color-surface)]/70 p-6 md:grid-cols-[1.1fr_1fr]">
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-white">
            Micro-outils & démos en libre accès
          </h2>
            <ul className="space-y-2 text-sm text-white/75">
              <li>• Sandbox de chatbot IA connecté à vos documents.</li>
              <li>• Calculateur de ROI automation (Zapier + Notion + Slack).</li>
              <li>• Viewer avant/après pour refontes (Figma + Vercel preview).</li>
            </ul>
          <Link
            href="https://github.com/"
            className="inline-flex w-fit items-center rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase text-white/80 transition hover:border-[color:var(--color-secondary)] hover:text-white"
          >
            Explorer les outils open source
          </Link>
        </div>
        <QuoteSummary pricing={sampleQuote} projectName="Refonte vitrine premium" />
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial) => (
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

      <div className="flex flex-wrap items-center justify-between gap-6">
        <div className="max-w-xl space-y-3">
          <h2 className="text-2xl font-semibold text-white">
            Prêt à lancer la prochaine étude de cas ?
          </h2>
          <p className="text-sm text-white/70">
            On audite votre produit actuel, on identifie les quick wins, on
            prototype un différenciateur, puis on automatise votre delivery.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/devis"
            className="inline-flex items-center rounded-full bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-secondary)] px-5 py-3 text-sm font-semibold uppercase text-white"
          >
            Obtenir un devis
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full border border-white/20 px-5 py-3 text-sm font-semibold uppercase text-white/80 transition hover:border-[color:var(--color-secondary)] hover:text-white"
          >
            Parler projet
          </Link>
        </div>
      </div>
    </section>
  );
}
