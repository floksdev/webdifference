"use client";

import Link from "next/link";
import { useState } from "react";

const actions = [
  {
    href: "/devis",
    label: "Devis express",
    description: "60 s pour obtenir votre budget",
    style:
      "bg-gradient-to-r from-[#6C63FF] to-[#00E0FF] text-white shadow-[0_12px_40px_rgba(0,224,255,0.25)]",
  },
  {
    href: "/portfolio",
    label: "Voir les résultats",
    description: "Cas clients & vidéos",
    style: "border border-white/20 bg-[color:var(--color-background-strong)]/90 text-white/85",
  },
];

export function FloatingQuickActions() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <aside className="fixed bottom-6 right-6 z-50 hidden flex-col gap-3 rounded-3xl border border-white/10 bg-[color:var(--color-surface)]/95 p-4 shadow-[0_18px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:flex">
      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="ml-auto text-xs uppercase tracking-[0.3em] text-white/45 transition hover:text-white/70"
        aria-label="Fermer les raccourcis"
      >
        fermer
      </button>
      <p className="text-sm font-semibold uppercase tracking-[0.32em] text-white/70">
        Besoin d&apos;aide ?
      </p>
      <div className="flex flex-col gap-2">
        {actions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className={`flex flex-col rounded-2xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] transition hover:scale-[1.02] ${action.style}`}
          >
            {action.label}
            <span className="pt-1 text-[10px] font-normal normal-case text-white/80">
              {action.description}
            </span>
          </Link>
        ))}
      </div>
    </aside>
  );
}
