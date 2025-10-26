import { formatEuro } from "@/lib/utils";
import type { PricingBreakdown } from "@/lib/pricing-engine";

type QuoteSummaryProps = {
  pricing: PricingBreakdown | null;
  projectName?: string;
};

export function QuoteSummary({ pricing, projectName }: QuoteSummaryProps) {
  if (!pricing) {
    return (
      <aside className="rounded-3xl border border-white/10 bg-[color:var(--color-surface)]/70 p-6 text-sm text-white/70">
        Sélectionnez un type de projet et un niveau de design pour afficher une
        estimation instantanée.
      </aside>
    );
  }

  return (
    <aside className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-[color:var(--color-surface)]/80 p-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-white/60">
          Estimation pour
        </p>
        <p className="mt-1 text-lg font-semibold text-white">
          {projectName ?? "Votre projet"}
        </p>
        <p className="mt-3 text-4xl font-bold text-white">
          {formatEuro(pricing.total)}
        </p>
        <p className="mt-1 text-sm text-white/70">
          Budget recommandé :{" "}
          <span className="font-semibold text-white/90">
            {formatEuro(pricing.recommendedBudget)}
          </span>
        </p>
      </div>

      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-white/60">
          Détails
        </p>
        <ul className="space-y-2 text-sm text-white/75">
          {pricing.items.map((item) => (
            <li
              key={item.label}
              className="flex items-start justify-between gap-4 rounded-2xl border border-white/5 bg-white/5 px-3 py-2"
            >
              <span className="max-w-[70%]">
                <span className="block font-semibold text-white">
                  {item.label}
                </span>
                {item.description ? (
                  <span className="text-xs text-white/60">{item.description}</span>
                ) : null}
              </span>
              <span className="text-sm font-semibold text-white">
                {formatEuro(item.amount)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-white/60">
          Plans de paiement
        </p>
        <ul className="space-y-2 text-sm text-white/75">
          {pricing.paymentScenarios.map((scenario) => (
            <li
              key={scenario.label}
              className="flex flex-col gap-1 rounded-2xl border border-white/5 bg-white/5 px-3 py-2"
            >
              <span className="font-semibold text-white">{scenario.label}</span>
              <span className="text-white/80">
                {formatEuro(scenario.amount)} · {scenario.description}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
