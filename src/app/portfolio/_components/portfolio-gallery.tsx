"use client";

import { useMemo, useState } from "react";
import { projects } from "@/data/projects";
import { TogglePill } from "@/components/ui/toggle-pill";
import { cn } from "@/lib/utils";
import Link from "next/link";

const sectors = ["SaaS", "E-commerce", "Fintech", "Marque", "Automatisation"];
const stackFilters = Array.from(
  new Set(projects.flatMap((project) => project.stack)),
);

export function PortfolioGallery() {
  const [selectedStack, setSelectedStack] = useState<string | null>(null);
  const [showInProgress, setShowInProgress] = useState(false);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchStack = selectedStack
        ? project.stack.includes(selectedStack)
        : true;
      const matchInProgress = showInProgress ? project.inProgress : true;
      return matchStack && matchInProgress;
    });
  }, [selectedStack, showInProgress]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-3">
        {sectors.map((category) => (
          <span
            key={category}
            className="rounded-full border border-white/15 bg-[color:var(--color-surface)]/70 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/65"
          >
            {category}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3 text-sm text-white/70">
        <span className="text-xs uppercase tracking-[0.3em] text-white/50">
          Filtres stack
        </span>
        <TogglePill active={!selectedStack} onClick={() => setSelectedStack(null)}>
          Toutes
        </TogglePill>
        {stackFilters.map((stack) => (
          <TogglePill
            key={stack}
            active={selectedStack === stack}
            onClick={() => setSelectedStack(stack)}
          >
            {stack}
          </TogglePill>
        ))}
        <label className="ml-auto inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/50">
          <input
            type="checkbox"
            className="h-4 w-4 accent-[color:var(--color-secondary)]"
            checked={showInProgress}
            onChange={(event) => setShowInProgress(event.target.checked)}
          />
          Projets en cours
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {filteredProjects.map((project) => (
          <article
            key={project.slug}
            className="group flex flex-col gap-4 rounded-3xl border border-white/10 bg-[color:var(--color-surface)]/90 p-5 transition hover:border-[color:var(--color-secondary)]/70 hover:shadow-lg hover:shadow-[rgba(0,224,255,0.12)]"
          >
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em]">
              <span
                className={cn(
                  "rounded-full px-3 py-1",
                  project.inProgress
                    ? "bg-[color:rgba(0,224,255,0.15)] text-white"
                    : "bg-white/10 text-white/70",
                )}
              >
                {project.inProgress ? "Projet en cours" : project.status.toLowerCase()}
              </span>
              <span className="text-white/60">{project.impact}</span>
            </div>
            <h3 className="text-lg font-semibold text-white">{project.title}</h3>
            <p className="text-sm text-white/70">{project.tagline}</p>
            <p className="text-xs text-white/60">{project.description}</p>
            <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.2em] text-white/55">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 px-3 py-1"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="mt-auto flex items-center justify-between">
              {project.caseStudyUrl ? (
                <Link
                  href={project.caseStudyUrl}
                  className="text-xs font-semibold uppercase text-[color:var(--color-secondary)]"
                >
                  Voir le case study →
                </Link>
              ) : (
                <span className="text-xs uppercase tracking-[0.2em] text-white/40">
                  Case study privé
                </span>
              )}
              {project.liveUrl ? (
                <Link
                  href={project.liveUrl}
                  className="text-xs font-semibold uppercase text-white/60 hover:text-white"
                >
                  Site live ↗
                </Link>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
