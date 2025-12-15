 "use client";

import { ReactNode } from "react";
import Link from "next/link";

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
    summary: "Analyse 360 degrés en 72 h",
    description:
      "On passe au crible vos parcours, la vitesse et le SEO pour mettre le doigt sur ce qui freine vos conversions.",
    proof: "Rapport priorisé livré + restitution live",
    ctaLabel: "Audit 0 €",
    ctaHint: "72 h",
    icon: (
      <svg
        viewBox="0 0 32 32"
        className="h-10 w-10 text-white"
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
      "Score UX, technique et contenu noté",
      "Roadmap d'actions priorisée et chiffrée",
      "Session live avec vos équipes pour aligner tout le monde",
    ],
  },
  {
    id: "refonte",
    title: "Refonte progressive",
    summary: "Modernisation sans repartir de zéro",
    description:
      "On garde vos acquis, on modernise le design et on optimise chaque parcours pour relancer la conversion.",
    proof: "-45 % de temps de chargement moyen sur nos refontes",
    ctaLabel: "Refonte",
    ctaHint: "1er atelier offert",
    icon: (
      <svg
        viewBox="0 0 32 32"
        className="h-10 w-10 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M6.5 6.5h19v19h-19z" />
        <path d="m10 10 12 12M22 10v12H10" />
      </svg>
    ),
    bullets: [
      "Design system et contenus revisités par itérations",
      "Test utilisateurs ou AB test inclus sur les pages clés",
      "Accompagnement produit, marketing et dev en parallèle",
    ],
  },
  {
    id: "maintenance",
    title: "Maintenance & coaching continu",
    summary: "Support dev + marketing",
    description:
      "On prend en charge la santé technique et les évolutions avec un coaching mensuel pour votre équipe.",
    proof: "98 % des demandes résolues en moins de 24 h",
    ctaLabel: "Maintenance",
    ctaHint: "Sans engagement",
    icon: (
      <svg
        viewBox="0 0 32 32"
        className="h-10 w-10 text-white"
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
      "Monitoring 24/7, sauvegardes et correctifs illimités",
      "Plan d'évolution produit déclenché à chaque point mensuel",
      "Support Slack direct avec l'équipe projet",
    ],
  },
];

export function ExistingSiteSection() {
  return (
    <section className="border-t border-white/10 py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6">
        <div className="flex flex-col gap-3 text-center">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Votre site n'est pas passé entre nos mains ?
          </h2>
          <p className="text-base text-white/80 max-w-2xl mx-auto">
            Pas de panique : on peut auditer, moderniser ou accompagner votre plateforme actuelle sans repartir de zéro.
          </p>
        </div>

        {/* Grande carte unique et compacte */}
        <div className="rounded-2xl bg-gradient-to-br from-[#E0ACBC]/15 to-[#D4A5C7]/15 border border-[#E0ACBC]/30 backdrop-blur-sm shadow-lg p-6 md:p-8">
          <div className="flex flex-col gap-6">
            {options.map((option, index) => (
              <div
                key={option.id}
                className={`flex flex-col md:flex-row gap-4 items-start ${index < options.length - 1 ? 'pb-6 border-b border-[#E0ACBC]/20' : ''}`}
              >
                {/* Icône */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#E0ACBC] to-[#D4A5C7] border border-white/20">
                  <div className="text-white">
                    {option.icon}
                  </div>
                </div>
                
                {/* Contenu */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-white">
                      {option.title}
                    </h3>
                    <span className="text-xs text-[#E0ACBC] font-medium">
                      {option.proof}
                    </span>
                  </div>
                  <p className="text-sm text-white/75 mb-3 leading-relaxed">
                    {option.description}
                  </p>
                  
                  {/* Points clés en ligne */}
                  <div className="flex flex-wrap gap-x-4 gap-y-2 mb-3">
                    {option.bullets.map((point) => (
                      <div key={point} className="flex items-center gap-1.5">
                        <span className="text-[#E0ACBC] text-xs">✓</span>
                        <span className="text-xs text-white/80">{point}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* CTA */}
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-lg border border-[#E0ACBC]/60 bg-gradient-to-r from-[#D4A5C7]/60 to-[#D4A5C7]/40 px-4 py-2 text-xs font-semibold text-white transition-all hover:border-[#E0ACBC] hover:from-[#D4A5C7]/80 hover:to-[#D4A5C7]/60"
                  >
                    {option.ctaLabel}
                    <span className="text-[10px] text-white/70">
                      {option.ctaHint}
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
