import { formatEuro } from "@/lib/utils";
import type { PricingBreakdown } from "@/lib/pricing-engine";

type QuoteSummaryProps = {
  pricing: PricingBreakdown | null;
  projectName?: string;
};

export function QuoteSummary({ pricing, projectName }: QuoteSummaryProps) {
  if (!pricing) {
    return (
      <aside className="rounded-3xl border border-[#1C1C1C]/10 bg-[color:var(--color-surface)]/70 p-6 text-sm text-[#1C1C1C]/80">
        Sélectionnez un type de projet et un niveau de design pour afficher une
        estimation instantanée.
      </aside>
    );
  }

  return (
    <aside className="flex flex-col gap-6 rounded-3xl border border-[#1C1C1C]/10 bg-[color:var(--color-surface)]/80 p-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-[#1C1C1C]/60">
          Estimation pour
        </p>
        <p className="mt-1 text-lg font-semibold text-[#1C1C1C]">
          {projectName ?? "Votre projet"}
        </p>
        <p className="mt-3 text-4xl font-bold text-[#1C1C1C]">
          {formatEuro(pricing.total)}
        </p>
        <p className="mt-1 text-sm text-[#1C1C1C]/80">
          Budget recommandé :{" "}
          <span className="font-semibold text-[#1C1C1C]">
            {formatEuro(pricing.recommendedBudget)}
          </span>
        </p>
      </div>

      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-[#1C1C1C]/60">
          Détails
        </p>
        <ul className="space-y-2 text-sm text-[#1C1C1C]/80">
          {pricing.items.map((item) => (
            <li
              key={item.label}
              className="flex items-start justify-between gap-4 rounded-2xl border border-[#1C1C1C]/5 bg-[#1C1C1C]/5 px-3 py-2"
            >
              <span className="max-w-[70%]">
                <span className="block font-semibold text-[#1C1C1C]">
                  {item.label}
                </span>
                {item.description ? (
                  <span className="text-xs text-[#1C1C1C]/60">{item.description}</span>
                ) : null}
              </span>
              <span className="text-sm font-semibold text-[#1C1C1C]">
                {formatEuro(item.amount)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-[#1C1C1C]/60">
          Plans de paiement
        </p>
        <ul className="space-y-2 text-sm text-[#1C1C1C]/80">
          {pricing.paymentScenarios.map((scenario) => (
            <li
              key={scenario.label}
              className="flex flex-col gap-1 rounded-2xl border border-[#1C1C1C]/5 bg-[#1C1C1C]/5 px-3 py-2"
            >
              <span className="font-semibold text-[#1C1C1C]">{scenario.label}</span>
              <span className="text-[#1C1C1C]/70">
                {formatEuro(scenario.amount)} · {scenario.description}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
