import { describe, expect, it } from "vitest";

import { computeQuotePricing } from "./pricing-engine";

const basePayload = {
  projectType: "saas",
  designLevel: "sur-mesure",
  functionalScope: ["automations", "portal"],
  marketingSupport: true,
  deadline: undefined,
  budgetRange: { min: 6000, max: 12000 },
  paymentPreference: "IBAN",
  subscriptionModel: { enabled: false },
} as const;

describe("computeQuotePricing", () => {
  it("calcule le total et les lignes de coûts", () => {
    const result = computeQuotePricing({ ...basePayload });

    const labels = result.items.map((item) => item.label);
    expect(labels).toContain("Base SaaS / Plateforme");
    expect(labels).toContain("Design Sur-mesure");
    expect(labels).toContain("Automatisations pro");
    expect(labels).toContain("Portail client");
    expect(labels).toContain("Accompagnement marketing / SEO");

    expect(result.total).toBeGreaterThan(6000);
    expect(result.recommendedBudget).toBeGreaterThanOrEqual(result.total);
    expect(result.paymentScenarios).toHaveLength(3);
  });

  it("ajoute un supplément rush si deadline < 21 jours", () => {
    const rushPayload = {
      ...basePayload,
      deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
    } as const;

    const result = computeQuotePricing(rushPayload);
    const rushLine = result.items.find((item) => item.label === "Mode accéléré");

    expect(rushLine).toBeDefined();
    expect(rushLine?.amount).toBeGreaterThan(0);
    expect(result.total).toBeGreaterThan(computeQuotePricing(basePayload).total);
  });
});
