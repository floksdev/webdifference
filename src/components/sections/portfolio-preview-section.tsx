import Link from "next/link";

import { projects } from "@/data/projects";

const sectors = [
  "Site vitrine",
  "E-commerce",
  "SaaS & applications",
  "SEO & acquisition",
  "Maintenance",
  "Refonte",
];

export function PortfolioPreviewSection() {
  return (
    <section className="border-t border-white/10 bg-[color:var(--color-background-strong)] py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Cas clients et résultats vérifiés
            </h2>
            <p className="text-base text-white/70">
              Chaque projet partage ses chiffres clés, le contexte métier et la
              manière dont nous avons accompagné l’équipe.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex w-fit items-center rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white/85 transition hover:border-[color:var(--color-secondary)] hover:text-white"
          >
            Demander des références
          </Link>
        </div>
        <div className="flex flex-wrap gap-3 text-xs text-white/60">
          {sectors.map((sector) => (
            <span
              key={sector}
              className="rounded-full border border-white/20 bg-[color:var(--color-surface)]/70 px-4 py-2 text-white/80"
            >
              {sector}
            </span>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-[color:var(--color-surface)]/85 p-6"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-[color:var(--color-secondary)]/80">
                  {project.status === "LIVE"
                    ? "En ligne"
                    : project.status === "IN_PROGRESS"
                      ? "En cours"
                      : "Prototype"}
                </p>
                <p className="text-xs text-white/60">{project.impact}</p>
              </div>
              <h3 className="text-xl font-semibold text-white">
                {project.title}
              </h3>
              <p className="text-sm text-white/70">{project.tagline}</p>
              <ul className="space-y-2 text-sm text-white/65">
                {project.stack.slice(0, 3).map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
              <div className="mt-auto">
                <p className="text-xs text-white/55">
                  Métriques clés
                </p>
                <div className="mt-2 grid gap-2">
                  {project.metrics?.slice(0, 2).map((metric) => (
                    <p key={metric.label} className="text-sm text-white/70">
                      {metric.label} : {metric.value}
                    </p>
                  ))}
                </div>
              </div>
              <Link
                href={project.caseStudyUrl ?? "/contact"}
                className="mt-4 inline-flex w-fit items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-white"
              >
                Voir le détail →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
