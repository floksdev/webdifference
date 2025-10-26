import {
  designLevels,
  featurePacks,
  marketingSupportPrice,
  projectTypes,
  rushMultiplier,
} from "@/data/quote-config";
import type { ProjectQuoteInput } from "@/lib/schemas/project-quote";

export type PricingBreakdownItem = {
  label: string;
  amount: number;
  description?: string;
};

export type PaymentScenario = {
  label: string;
  amount: number;
  description: string;
};

export type PricingBreakdown = {
  subtotal: number;
  total: number;
  items: PricingBreakdownItem[];
  recommendedBudget: number;
  paymentScenarios: PaymentScenario[];
};

const formatCurrency = (value: number) =>
  Math.round(value / 10) * 10; // simple rounding for display

export function computeQuotePricing(payload: ProjectQuoteInput): PricingBreakdown {
  const items: PricingBreakdownItem[] = [];

  const project =
    projectTypes.find((type) => type.value === payload.projectType) ??
    projectTypes[0];
  const design =
    designLevels.find((level) => level.value === payload.designLevel) ??
    designLevels[0];

  const base = project.basePrice;
  items.push({
    label: `Base ${project.label}`,
    amount: base,
    description: "Kickoff, architecture, design system et intégration.",
  });

  const designCost = base * (design.multiplier - 1);
  if (designCost > 0) {
    items.push({
      label: `Design ${design.label}`,
      amount: designCost,
      description: design.description,
    });
  }

  payload.functionalScope.forEach((featureKey) => {
    const feature = featurePacks.find((pack) => pack.value === featureKey);
    if (feature) {
      items.push({
        label: feature.label,
        amount: feature.price,
        description: feature.description,
      });
    }
  });

  if (payload.marketingSupport) {
    items.push({
      label: "Accompagnement marketing / SEO",
      amount: marketingSupportPrice,
      description: "Sprints contenus + plan SEO technique + analytics.",
    });
  }

  let subtotal = items.reduce((acc, item) => acc + item.amount, 0);

  if (payload.deadline) {
    const deadlineDate = new Date(payload.deadline);
    const now = new Date();
    const diff = deadlineDate.getTime() - now.getTime();
    const days = diff / (1000 * 60 * 60 * 24);
    if (days > 0 && days <= 21) {
      const rushCost = subtotal * (rushMultiplier - 1);
      subtotal += rushCost;
      items.push({
        label: "Mode accéléré",
        amount: rushCost,
        description: "Slot prioritaire, squad dédiée, livrables rush.",
      });
    }
  }

  const total = formatCurrency(subtotal);
  const recommendedBudget = Math.max(
    total,
    payload.budgetRange?.max ?? total,
    payload.budgetRange?.min ?? total,
  );

  const paymentScenarios: PaymentScenario[] = [
    {
      label: "Acompte 50% + solde",
      amount: formatCurrency(total * 0.5),
      description: "Signature IBAN/CB immédiate, solde à la livraison.",
    },
    {
      label: "Paiement 3 fois",
      amount: formatCurrency(total / 3),
      description: "Échelonné sur 3 mois sans frais via Stripe.",
    },
    {
      label: "Abonnement SaaS",
      amount: formatCurrency(Math.max(total / 12, 350)),
      description: "Option pour plan Growth incluant ops & monitoring.",
    },
  ];

  return {
    subtotal,
    total,
    items,
    recommendedBudget,
    paymentScenarios,
  };
}
