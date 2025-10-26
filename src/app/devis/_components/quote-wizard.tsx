"use client";

import { useMemo, useState } from "react";
import { Controller, FormProvider, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import type { z } from "zod";

import { projectTypes, designLevels, featurePacks } from "@/data/quote-config";
import { projectQuoteSchema } from "@/lib/schemas/project-quote";
import { useQuoteStore } from "@/lib/stores/use-quote-store";
import { TogglePill } from "@/components/ui/toggle-pill";
import { SelectableCard } from "@/components/ui/selectable-card";
import { StepIndicator } from "@/components/ui/step-indicator";
import { QuoteSummary } from "./quote-summary";
import { computeQuotePricing } from "@/lib/pricing-engine";
import type { ProjectQuoteInput } from "@/lib/schemas/project-quote";

const steps = [
  {
    title: "Projet",
    description: "Type de projet & ambition",
  },
  {
    title: "Fonctionnalités",
    description: "Modules & automatisations",
  },
  {
    title: "Planning",
    description: "Deadline & accompagnement",
  },
  {
    title: "Résumé",
    description: "Estimation & prochaines étapes",
  },
];

const budgetPresets = [
  { label: "3 000 – 6 000 €", min: 3000, max: 6000 },
  { label: "6 000 – 10 000 €", min: 6000, max: 10000 },
  { label: "10 000 – 18 000 €", min: 10000, max: 18000 },
  { label: "18 000 €+", min: 18000, max: 26000 },
];

const paymentPreferences = [
  { value: "IBAN", label: "IBAN instantané" },
  { value: "STRIPE", label: "Stripe (CB / 3x)" },
  { value: "DOWN_PAYMENT", label: "Acompte 50% + solde" },
];

const animations = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
};

type ProjectQuoteFormValues = z.input<typeof projectQuoteSchema>;

export function QuoteWizard() {
  const [step, setStep] = useState(0);
  const { data, update } = useQuoteStore();

  const form = useForm<ProjectQuoteFormValues, undefined, ProjectQuoteInput>({
    resolver: zodResolver(projectQuoteSchema),
    defaultValues: data,
    mode: "onChange",
  });

  const watchedValues = useWatch({ control: form.control });

  const mergedValues = {
    ...data,
    ...(watchedValues ?? {}),
    budgetRange: {
      ...data.budgetRange,
      ...(watchedValues?.budgetRange ?? {}),
    },
    subscriptionModel: {
      ...data.subscriptionModel,
      ...(watchedValues?.subscriptionModel ?? {}),
    },
  } as ProjectQuoteInput;

  const parsed = projectQuoteSchema.safeParse(mergedValues);
  const pricing = useMemo(
    () => (parsed.success ? computeQuotePricing(parsed.data) : null),
    [parsed],
  );

  const onNext = async () => {
    const valid = await form.trigger();
    if (!valid) return;
    const snapshot = projectQuoteSchema.safeParse(form.getValues());
    if (snapshot.success) {
      update(snapshot.data);
    }
    if (step < steps.length - 1) {
      setStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const onPrevious = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const onSubmit = async (values: ProjectQuoteInput) => {
    update(values);
    setStep(steps.length - 1);
  };

  return (
    <FormProvider {...form}>
      <form
        className="grid gap-8 md:grid-cols-[minmax(0,1fr)_360px]"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="space-y-8">
          <StepIndicator steps={steps} current={step} />
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step-0"
                {...animations}
                className="space-y-6 rounded-3xl border border-white/10 bg-[color:var(--color-surface)]/80 p-6"
              >
                <div className="space-y-3">
                  <h2 className="text-xl font-semibold text-white">
                    Quel type de projet ?
                  </h2>
                  <p className="text-sm text-white/70">
                    Choisissez le format qui correspond le mieux à vos objectifs.
                  </p>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  {projectTypes.map((type) => (
                    <SelectableCard
                      key={type.value}
                      active={watchedValues.projectType === type.value}
                      onClick={() => form.setValue("projectType", type.value, { shouldValidate: true })}
                      description={`${type.basePrice.toLocaleString("fr-FR")} € base`}
                    >
                      {type.label}
                    </SelectableCard>
                  ))}
                </div>
                <div className="space-y-3">
                  <h3 className="text-base font-semibold text-white">
                    Niveau de design
                  </h3>
                  <div className="grid gap-3 md:grid-cols-3">
                    {designLevels.map((level) => (
                      <SelectableCard
                        key={level.value}
                        active={watchedValues.designLevel === level.value}
                        onClick={() =>
                          form.setValue("designLevel", level.value, { shouldValidate: true })
                        }
                        description={level.description}
                        badge={`${Math.round(level.multiplier * 100)}%`}
                      >
                        {level.label}
                      </SelectableCard>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-base font-semibold text-white">
                    Budget estimé
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {budgetPresets.map((budget) => {
                      const active =
                        watchedValues.budgetRange?.min === budget.min &&
                        watchedValues.budgetRange?.max === budget.max;
                      return (
                        <TogglePill
                          key={budget.label}
                          active={active}
                          onClick={() =>
                            form.setValue(
                              "budgetRange",
                              { min: budget.min, max: budget.max },
                              { shouldValidate: true },
                            )
                          }
                        >
                          {budget.label}
                        </TogglePill>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step-1"
                {...animations}
                className="space-y-6 rounded-3xl border border-white/10 bg-[color:var(--color-surface)]/80 p-6"
              >
                <div className="space-y-3">
                  <h2 className="text-xl font-semibold text-white">
                    Fonctionnalités clés
                  </h2>
                  <p className="text-sm text-white/70">
                    Sélectionnez les modules qui vous intéressent. Ajoutez-en
                    plusieurs si besoin.
                  </p>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  {featurePacks.map((feature) => {
                    const active =
                      watchedValues.functionalScope?.includes(feature.value) ?? false;
                    return (
                      <SelectableCard
                        key={feature.value}
                        active={active}
                        onClick={() => {
                          const current = watchedValues.functionalScope ?? [];
                          const exists = current.includes(feature.value);
                          const next = exists
                            ? current.filter((value) => value !== feature.value)
                            : [...current, feature.value];
                          form.setValue("functionalScope", next, { shouldValidate: true });
                        }}
                        description={`${feature.price.toLocaleString("fr-FR")} € · ${feature.description}`}
                      >
                        {feature.label}
                      </SelectableCard>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step-2"
                {...animations}
                className="space-y-6 rounded-3xl border border-white/10 bg-[color:var(--color-surface)]/80 p-6"
              >
                <div className="space-y-3">
                  <h2 className="text-xl font-semibold text-white">
                    Planning & accompagnement
                  </h2>
                  <p className="text-sm text-white/70">
                    Besoin d&apos;un mode rush, d&apos;un accompagnement marketing ou
                    d&apos;un paiement spécifique ?
                  </p>
                </div>
                <Controller
                  control={form.control}
                  name="marketingSupport"
                  render={({ field }) => (
                    <label className="flex cursor-pointer items-center justify-between rounded-3xl border border-white/10 bg-white/5 p-4">
                      <div>
                        <p className="text-sm font-semibold text-white">
                          Accompagnement marketing & SEO
                        </p>
                        <p className="text-xs text-white/65">
                          Sprints contenus, plan SEO technique, analytics & playbooks.
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        className="h-5 w-5 accent-[color:var(--color-secondary)]"
                        checked={field.value}
                        onChange={(event) => field.onChange(event.target.checked)}
                      />
                    </label>
                  )}
                />
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="flex flex-col gap-2 text-sm text-white/70">
                    Deadline idéale
                    <input
                      type="date"
                      value={watchedValues.deadline ?? ""}
                      onChange={(event) => form.setValue("deadline", event.target.value)}
                      className="rounded-2xl border border-white/10 bg-[color:rgba(14,22,31,0.65)] px-4 py-3 text-white outline-none transition focus:border-[color:var(--color-secondary)]"
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-white/70">
                    Préférence de paiement
                    <div className="flex flex-wrap gap-2">
                      {paymentPreferences.map((option) => (
                        <TogglePill
                          key={option.value}
                          active={watchedValues.paymentPreference === option.value}
                          onClick={() =>
                            form.setValue("paymentPreference", option.value, {
                              shouldValidate: true,
                            })
                          }
                        >
                          {option.label}
                        </TogglePill>
                      ))}
                    </div>
                  </label>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step-3"
                {...animations}
                className="space-y-6 rounded-3xl border border-white/10 bg-[color:var(--color-surface)]/80 p-6"
              >
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-white">
                    Résumé & prochaine étape
                  </h2>
                  <p className="text-sm text-white/70">
                    Vérifiez vos informations. Vous recevrez ensuite un PDF de devis
                    + un onboarding automatisé.
                  </p>
                </div>
                <ul className="space-y-3 text-sm text-white/75">
                  <li>
                    <span className="font-semibold text-white">Type de projet :</span>{" "}
                    {projectTypes.find((type) => type.value === watchedValues.projectType)?.label ??
                      "—"}
                  </li>
                  <li>
                    <span className="font-semibold text-white">Design :</span>{" "}
                    {designLevels.find((level) => level.value === watchedValues.designLevel)?.label ??
                      "—"}
                  </li>
                  <li>
                    <span className="font-semibold text-white">Fonctionnalités :</span>{" "}
                    {watchedValues.functionalScope?.length
                      ? watchedValues.functionalScope
                          .map(
                            (feature) =>
                              featurePacks.find((pack) => pack.value === feature)?.label ?? feature,
                          )
                          .join(" · ")
                      : "—"}
                  </li>
                  <li>
                    <span className="font-semibold text-white">Accompagnement marketing :</span>{" "}
                    {watchedValues.marketingSupport ? "Oui" : "Non"}
                  </li>
                  <li>
                    <span className="font-semibold text-white">Deadline :</span>{" "}
                    {watchedValues.deadline
                      ? new Date(watchedValues.deadline).toLocaleDateString("fr-FR")
                      : "Flexible"}
                  </li>
                  <li>
                    <span className="font-semibold text-white">Paiement :</span>{" "}
                    {
                      paymentPreferences.find(
                        (option) => option.value === watchedValues.paymentPreference,
                      )?.label
                    }
                  </li>
                </ul>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-secondary)] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-[rgba(0,224,255,0.25)] transition hover:shadow-[rgba(108,99,255,0.3)]"
                >
                  Recevoir la proposition détaillée
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onPrevious}
              disabled={step === 0}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition hover:text-white disabled:cursor-not-allowed disabled:text-white/40"
            >
              ← Étape précédente
            </button>
            {step < steps.length - 1 ? (
              <button
                type="button"
                onClick={onNext}
                className="inline-flex items-center rounded-full bg-[color:var(--color-secondary)]/90 px-5 py-2 text-sm font-semibold uppercase text-[color:var(--color-background-strong)] transition hover:bg-[color:var(--color-secondary)]"
              >
                Étape suivante →
              </button>
            ) : null}
          </div>
        </div>

        <QuoteSummary pricing={pricing} />
      </form>
    </FormProvider>
  );
}
