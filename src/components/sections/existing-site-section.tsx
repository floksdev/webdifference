 "use client";

import { ReactNode, useState } from "react";

type Option = {
  id: string;
  title: string;
  summary: string;
  description: string;
  proof: string;
  ctaLabel: string;
  ctaHint: string;
  icon: ReactNode;
  bullets: string[];
};

const options: Option[] = [
  {
    id: "audit",
    title: "Audit express & plan d'action",
    summary: "Analyse 360 degres en 72 h",
    description:
      "On passe au crible vos parcours, la vitesse et le SEO pour mettre le doigt sur ce qui freine vos conversions.",
    proof: "Rapport priorise livré + restitution live",
    ctaLabel: "Audit 0 €",
    ctaHint: "72 h",
    icon: (
      <svg
        viewBox="0 0 32 32"
        className="h-9 w-9 text-emerald-300"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <circle cx="15" cy="15" r="9.5" />
        <path d="m21.5 21.5 4 4" />
        <path d="M15 9v6l3.5 1.5" />
      </svg>
    ),
    bullets: [
      "Score UX, technique et contenu note",
      "Roadmap d'actions priorisee et chiffre",
      "Session live avec vos equipes pour aligner tout le monde",
    ],
  },
  {
    id: "refonte",
    title: "Refonte progressive",
    summary: "Modernisation sans repartir de zero",
    description:
      "On garde vos acquis, on modernise le design et on optimise chaque parcours pour relancer la conversion.",
    proof: "-45 % de temps de chargement moyen sur nos refontes",
    ctaLabel: "Refonte",
    ctaHint: "1er atelier offert",
    icon: (
      <svg
        viewBox="0 0 32 32"
        className="h-9 w-9 text-sky-300"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M6.5 6.5h19v19h-19z" />
        <path d="m10 10 12 12M22 10v12H10" />
      </svg>
    ),
    bullets: [
      "Design system et contenus revisites par iteractions",
      "Test utilisateurs ou AB test inclus sur les pages cle",
      "Accompagnement produit, marketing et dev en parallele",
    ],
  },
  {
    id: "maintenance",
    title: "Maintenance & coaching continu",
    summary: "Support dev + marketing",
    description:
      "On prend en charge la sante technique et les evolutions avec un coaching mensuel pour votre equipe.",
    proof: "98 % des demandes resolues en moins de 24 h",
    ctaLabel: "Maintenance",
    ctaHint: "Sans engagement",
    icon: (
      <svg
        viewBox="0 0 32 32"
        className="h-9 w-9 text-purple-300"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M8 8.5h16v6H8z" />
        <path d="M10 14.5h12v9H10z" />
        <path d="m16 5.5 2 3H14z" />
        <path d="m16 23.5 2 3H14z" />
      </svg>
    ),
    bullets: [
      "Monitoring 24/7, sauvegardes et correctifs illimites",
      "Plan d'evolution produit declenche a chaque point mensuel",
      "Support Slack direct avec l'equipe projet",
    ],
  },
];

export function ExistingSiteSection() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setActiveId((current) => (current === id ? null : id));
  };

  return (
    <section className="border-t border-white/10 bg-[color:var(--color-background-strong)] py-20">
      <div className="mx-auto flex max-w-4xl flex-col gap-12 px-6 text-center">
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Votre site n'est pas passé entre nos mains ?
          </h2>
          <p className="text-base text-white/70">
            Pas de panique : on peut auditer, moderniser ou accompagner votre
            plateforme actuelle sans repartir de zero. Choisissez la porte
            d'entree qui vous parle.
          </p>
        </div>

        <div className="flex flex-col divide-y divide-white/5 rounded-3xl border border-white/10 bg-[color:var(--color-surface)]/85 shadow-[0_24px_60px_rgba(8,20,42,0.35)]">
          {options.map((option) => {
            const isOpen = activeId === option.id;
            return (
              <div key={option.id}>
                <button
                  type="button"
                  onClick={() => toggle(option.id)}
                  aria-expanded={isOpen}
                  aria-controls={`${option.id}-content`}
                  className="flex w-full items-center gap-4 px-6 py-5 text-left transition hover:bg-white/4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-secondary)]"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80">
                    {option.icon}
                  </span>
                  <div className="flex flex-1 flex-col">
                    <span className="text-sm font-semibold uppercase text-white/60">
                      {option.summary}
                    </span>
                    <span className="text-lg font-semibold text-white">
                      {option.title}
                    </span>
                  </div>
                  <span
                    className={`inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white transition ${
                      isOpen ? "bg-[color:var(--color-secondary)] text-slate-950" : "bg-white/5"
                    }`}
                    aria-hidden
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                <div
                  id={`${option.id}-content`}
                  className={`grid overflow-hidden px-6 transition-all duration-200 ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="flex flex-col gap-5 overflow-hidden py-6 md:flex-row md:items-start md:gap-8">
                    <div className="flex-1 space-y-3 text-left">
                      <p className="text-sm text-white/75">
                        {option.description}
                      </p>
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase text-white/70">
                        <span className="inline-block h-2 w-2 rounded-full bg-[color:var(--color-secondary)]" />
                        {option.proof}
                      </span>
                      <ul className="mt-2 space-y-2 text-sm text-white/75">
                        {option.bullets.map((point) => (
                          <li key={point} className="flex items-start gap-3">
                            <span className="mt-[2px] inline-flex h-4 w-4 items-center justify-center rounded-full bg-[color:var(--color-secondary)]/85 text-[10px] font-bold text-slate-950">
                              ✓
                            </span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-col gap-3 md:w-48">
                      <a
                        href="/devis"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--color-secondary)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[color:var(--color-secondary)]/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-secondary)]"
                      >
                        {option.ctaLabel}
                        <span className="text-xs font-medium text-white/70">
                          {option.ctaHint}
                        </span>
                      </a>
                      <p className="text-xs text-white/50">
                        Besoin d'en savoir plus ? On vous montre des cas clients
                        en live.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
