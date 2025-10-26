import Link from "next/link";

const categories = ["SaaS", "E-commerce", "Fintech", "Marque", "Automatisation"];

const projects = [
  {
    title: "FlowOps Analytics",
    stack: ["Next.js", "Supabase", "Plausible"],
    status: "Projet en cours",
    impact: "+42% de MRR",
  },
  {
    title: "Lumen Cosmetics",
    stack: ["Shopify Headless", "Stripe", "Zapier"],
    status: "Live",
    impact: "x3 taux de conversion",
  },
  {
    title: "Nova CRM",
    stack: ["Next.js", "OpenAI", "PostgreSQL"],
    status: "Prototype",
    impact: "MVP livré en 21 jours",
  },
];

export function PortfolioPreviewSection() {
  return (
    <section className="border-t border-white/10 bg-[color:var(--color-background-strong)] py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Proof of Work live
            </h2>
            <p className="text-base text-white/70">
              Galeries filtrables, case studies détaillés, statistiques
              d&apos;impact et outils en libre accès.
            </p>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex w-fit items-center rounded-full border border-white/20 px-5 py-3 text-sm font-semibold uppercase text-white/85 transition hover:border-[color:var(--color-secondary)] hover:text-white"
          >
            Explorer le portefeuille
          </Link>
        </div>
        <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.3em] text-white/50">
          {categories.map((category) => (
            <span
              key={category}
              className="rounded-full border border-white/20 px-4 py-2 bg-[color:var(--color-surface)]/60 text-white/75"
            >
              {category}
            </span>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.title}
              className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-[color:var(--color-surface)] p-6"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm uppercase tracking-[0.3em] text-[color:var(--color-secondary)]/80">
                  {project.status}
                </p>
                <p className="text-xs text-white/50">{project.impact}</p>
              </div>
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <p className="text-sm text-white/60">
                Stack: {project.stack.join(" · ")}
              </p>
              <button
                type="button"
                className="mt-auto inline-flex w-fit items-center gap-2 text-sm font-semibold text-white/70 transition hover:text-white"
              >
                Voir le case study →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
