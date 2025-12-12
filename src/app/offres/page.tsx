import type { Metadata } from "next";
import Link from "next/link";
import { offers } from "@/data/offers";
import { OfferConfigurator } from "./_components/offer-configurator";

const featureMatrix = [
  { label: "Prototype interactif", tiers: ["premium", "growth", "custom"] },
  { label: "Automatisation leads & CRM", tiers: ["starter", "premium", "growth", "custom"] },
  { label: "Portail client + support IA", tiers: ["premium", "growth", "custom"] },
  { label: "Dashboard analytics temps réel", tiers: ["premium", "growth", "custom"] },
  { label: "Ops & monitoring continu", tiers: ["growth", "custom"] },
  { label: "Workflows marketing multi-canaux", tiers: ["growth", "custom"] },
];

export const metadata: Metadata = {
  title: "Offres & services Web Difference",
  description:
    "Choisissez parmi les packs Starter, Premium, Growth ou construisez une offre sur-mesure avec IA, automatisations et analytics.",
};

export default function OffersPage() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-24">
      <header className="space-y-6">
        <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/70">
          Offres & services
        </div>
        <h1 className="text-3xl font-semibold sm:text-4xl md:text-5xl">
          Packs prêts à déployer + option sur-mesure
        </h1>
        <p className="max-w-3xl text-base text-white/70 md:text-lg">
          Starter pour lancer, Premium pour scaler un produit, Growth pour
          internaliser une squad ops · Ajoutez vos modules (IA, automation,
          analytics) en un clic.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        {offers.map((offer) => (
          <article
            key={offer.slug}
            className={`flex flex-col gap-4 rounded-3xl border p-6 ${offer.highlight ? "border-[color:var(--color-secondary)]/60 bg-[color:var(--color-surface)] shadow-lg shadow-[rgba(113,221,174,0.12)]" : "border-white/10 bg-[color:var(--color-surface)]/70"}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.3em] text-[#1C1C1C]/60">
                {offer.billing}
              </span>
              {offer.highlight ? (
                <span className="rounded-full bg-[color:rgba(113,221,174,0.15)] px-3 py-1 text-[10px] uppercase tracking-[0.4em] text-[#1C1C1C]">
                  Best-seller
                </span>
              ) : null}
            </div>
            <h2 className="text-xl font-semibold text-[#1C1C1C]">{offer.title}</h2>
            <p className="text-3xl font-bold text-[#1C1C1C]">{offer.price}</p>
            <p className="text-sm text-[#1C1C1C]/80">{offer.description}</p>
            <ul className="space-y-2 text-sm text-[#1C1C1C]/80">
              {offer.features.map((feature) => (
                <li key={feature} className="text-[#1C1C1C]">• {feature}</li>
              ))}
            </ul>
            <Link
              href={offer.slug === "custom" ? "/contact" : "/devis"}
              className={`mt-auto inline-flex w-fit items-center rounded-full px-4 py-2 text-xs font-semibold uppercase ${offer.highlight ? "bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-secondary)] text-slate-900" : "border border-[#1C1C1C]/20 text-[#1C1C1C] transition hover:border-[#1C1C1C] hover:bg-[#1C1C1C]/10"}`}
            >
              {offer.ctaLabel ?? "En savoir plus"}
            </Link>
          </article>
        ))}
      </div>

      <OfferConfigurator />

      <div className="overflow-hidden rounded-3xl border border-white/10">
        <table className="w-full border-separate border-spacing-0 bg-[color:var(--color-surface)]/60 text-sm text-white/70">
          <thead>
            <tr className="text-xs uppercase tracking-[0.3em] text-white/50">
              <th className="border-b border-white/10 px-4 py-3 text-left">Fonctionnalité</th>
              {offers.map((offer) => (
                <th key={offer.slug} className="border-b border-white/10 px-4 py-3">
                  {offer.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {featureMatrix.map((row) => (
              <tr key={row.label} className="border-white/10">
                <td className="border-b border-white/10 px-4 py-3 text-white">{row.label}</td>
                {offers.map((offer) => (
                  <td
                    key={`${row.label}-${offer.slug}`}
                    className="border-b border-white/10 px-4 py-3 text-center"
                  >
                    {row.tiers.includes(offer.slug) ? "✔️" : "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-[color:var(--color-surface)]/70 p-6">
          <h2 className="text-xl font-semibold text-white">FAQ express</h2>
          <div className="mt-4 space-y-4 text-sm text-white/70">
            <details className="group rounded-2xl border border-white/10 bg-white/5 p-4">
              <summary className="cursor-pointer text-white group-open:text-[color:var(--color-secondary)]">
                Comment se passe la signature ?
              </summary>
              <p className="mt-2 text-white/70">
                DocuSign en marque blanche, lien de paiement Stripe et IBAN
                instantané. Tout est relié à Notion + Slack pour lancer le projet sans friction.
              </p>
            </details>
            <details className="group rounded-2xl border border-white/10 bg-white/5 p-4">
              <summary className="cursor-pointer text-white group-open:text-[color:var(--color-secondary)]">
                Peut-on commencer par un sprint ?
              </summary>
              <p className="mt-2 text-white/70">
                Oui, le pack Starter peut servir de sprint d&apos;allumage. On peut ensuite
                upgrader vers Premium/Growth sans repartir de zéro.
              </p>
            </details>
            <details className="group rounded-2xl border border-white/10 bg-white/5 p-4">
              <summary className="cursor-pointer text-white group-open:text-[color:var(--color-secondary)]">
                Vous intégrez nos outils internes ?
              </summary>
              <p className="mt-2 text-white/70">
                Absolument. On se connecte à vos environnements (Linear, HubSpot, Notion,
                Slack, etc.) via API ou Zapier pour éviter la double saisie.
              </p>
            </details>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-[color:var(--color-surface)]/70 p-6">
          <h2 className="text-xl font-semibold text-white">
            Besoin d&apos;une config unique ?
          </h2>
          <p className="mt-3 text-sm text-white/70">
            On co-construit votre plan : audit différenciation, backlog produit, ops
            automatisés et blueprint IA. Livraison d&apos;un chantier complet en 24h.
          </p>
          <div className="mt-4 flex gap-3">
            <Link
              href="/devis"
              className="inline-flex items-center rounded-full bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-secondary)] px-5 py-3 text-sm font-semibold uppercase text-white"
            >
              Lancer le wizard
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full border border-white/20 px-5 py-3 text-sm font-semibold uppercase text-white/80 transition hover:border-[color:var(--color-secondary)] hover:text-white"
            >
              Appeler Tristan
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
}
