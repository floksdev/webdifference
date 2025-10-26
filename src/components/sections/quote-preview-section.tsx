"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const steps = [
  { title: "Brief intelligent", description: "Définissez votre vision en 90 secondes." },
  { title: "Prototype immersif", description: "Prototype cliquable livré sous 72h." },
  { title: "Livraison orchestrée", description: "Développement Next.js + automatisations connectées." },
  { title: "Croissance continue", description: "Monitoring, analytics et optimisation mensuelle." },
];

const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Stripe",
  "Prisma",
  "Supabase",
  "OpenAI",
  "Zapier",
  "Plausible",
  "DocuSign",
];

export function QuotePreviewSection() {
  return (
    <section className="border-t border-white/10 bg-[color:var(--color-background-strong)] py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Devis automatisé. Zéro friction.
            </h2>
            <p className="text-base text-white/70">
              Simulateur temps réel, segmentation par niveau de design, options
              d&apos;accompagnement et paiement instantané. Dès l&apos;envoi, vous
              recevez un PDF signé électroniquement, un onboarding automatisé et
              la roadmap Notion.
            </p>
            <Link
              href="/devis"
              className="inline-flex w-fit items-center rounded-full border border-white/20 px-5 py-3 text-sm font-semibold uppercase text-white/85 transition hover:border-[color:var(--color-secondary)] hover:text-white"
            >
              Lancer le générateur
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-white/10 bg-[color:var(--color-surface)] p-6 shadow-2xl shadow-[rgba(108,99,255,0.2)] backdrop-blur"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-white/60">
                  Estimation live
                </p>
                <span className="text-xs uppercase tracking-[0.3em] text-[color:var(--color-secondary)]/80">
                  +3 scénarios
                </span>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-[color:rgba(108,99,255,0.35)] via-[color:rgba(0,224,255,0.2)] to-[color:rgba(108,99,255,0.18)] p-4">
                <div className="flex items-baseline justify-between">
                  <p className="text-lg font-semibold">Pack Growth</p>
                  <p className="text-sm font-semibold text-white/70">
                    À partir de
                  </p>
                </div>
                <p className="mt-2 text-4xl font-bold">7 900€</p>
                <p className="mt-2 text-xs uppercase tracking-[0.3em] text-white/50">
                  Paiement IBAN instantané ou Stripe
                </p>
              </div>
              <div className="grid gap-2 text-sm text-white/70">
                <p>✓ Signature électronique intégrée</p>
                <p>✓ Notifications Slack + Notion automatiques</p>
                <p>✓ Token IA pour chatbot support</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Parcours client animé</h3>
            <div className="grid gap-4">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ delay: index * 0.12 }}
                  className="rounded-2xl border border-white/10 bg-[color:var(--color-surface)]/80 p-4"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/50">
                    {index + 1}
                  </p>
                  <p className="mt-2 text-lg font-semibold">{step.title}</p>
                  <p className="mt-2 text-sm text-white/70">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Stack technique favorite</h3>
            <div className="flex flex-wrap gap-3">
              {stack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/15 bg-[color:var(--color-surface)]/70 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white/75"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
