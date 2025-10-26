"use client";

import { useMemo, useState } from "react";
import { offers } from "@/data/offers";
import { featurePacks } from "@/data/quote-config";
import { SelectableCard } from "@/components/ui/selectable-card";
import { TogglePill } from "@/components/ui/toggle-pill";
import { formatEuro } from "@/lib/utils";

const configurablePlans = offers.filter((offer) => offer.basePrice > 0);

export function OfferConfigurator() {
  const [planSlug, setPlanSlug] = useState(configurablePlans[0]?.slug ?? "starter");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const plan = useMemo(
    () => configurablePlans.find((offer) => offer.slug === planSlug) ?? configurablePlans[0],
    [planSlug],
  );

  const addOnTotal = selectedAddOns.reduce((sum, addOn) => {
    const feature = featurePacks.find((pack) => pack.value === addOn);
    return sum + (feature?.price ?? 0);
  }, 0);

  const total = (plan?.basePrice ?? 0) + addOnTotal;
  const monthly = Math.max(total / 6, 450);

  return (
    <div className="space-y-6 rounded-3xl border border-white/10 bg-[color:var(--color-surface)]/70 p-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-white">Créer mon offre idéale</h2>
        <p className="text-sm text-white/70">
          Choisissez un pack de base puis ajoutez les modules d&apos;automatisation et
          d&apos;IA qui correspondent à vos besoins.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {configurablePlans.map((offer) => (
          <SelectableCard
            key={offer.slug}
            active={planSlug === offer.slug}
            onClick={() => setPlanSlug(offer.slug)}
            description={`${offer.description}`}
            badge={offer.billing}
          >
            {offer.title} · {offer.price}
          </SelectableCard>
        ))}
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">
          Modules facultatifs
        </h3>
        <div className="grid gap-3 md:grid-cols-2">
          {featurePacks.map((feature) => {
            const active = selectedAddOns.includes(feature.value);
            return (
              <SelectableCard
                key={feature.value}
                active={active}
                onClick={() => {
                  setSelectedAddOns((previous) =>
                    previous.includes(feature.value)
                      ? previous.filter((value) => value !== feature.value)
                      : [...previous, feature.value],
                  );
                }}
                description={`${feature.price.toLocaleString("fr-FR")} € · ${feature.description}`}
              >
                {feature.label}
              </SelectableCard>
            );
          })}
        </div>
      </div>

      <div className="space-y-3 rounded-3xl border border-white/10 bg-white/5 p-5">
        <p className="text-xs uppercase tracking-[0.3em] text-white/60">Estimation</p>
        <div className="flex flex-wrap items-baseline justify-between gap-3 text-white">
          <div>
            <p className="text-sm font-semibold text-white/60">Total projet</p>
            <p className="text-3xl font-bold">{formatEuro(total)}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-white/60">Option abonnement</p>
            <p className="text-xl font-semibold text-white/90">
              {formatEuro(monthly)}/mois
            </p>
            <p className="text-xs text-white/60">
              Inclut maintenance, analytics & support IA.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
          <TogglePill active icon="⚡">
            Signature DocuSign instantanée
          </TogglePill>
          <TogglePill active icon="🤝">
            Kick-off 24h
          </TogglePill>
        </div>
      </div>
    </div>
  );
}
