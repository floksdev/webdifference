"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const clientLogos = [
  "PME & artisans",
  "Franchises",
  "Startups",
  "Organismes publics",
  "Indépendants",
];

const liveSignals = [
  {
    label: "Demandes reçues cette semaine",
    start: 138,
    min: 128,
    max: 182,
    suffix: "+",
  },
  {
    label: "Devis créés en temps réel",
    start: 24,
    min: 18,
    max: 36,
    suffix: "",
  },
  {
    label: "Projets accompagnés en ce moment",
    start: 17,
    min: 12,
    max: 22,
    suffix: "",
  },
];

export function HeroSection() {
  const [liveValues, setLiveValues] = useState(() =>
    liveSignals.map((signal) => signal.start),
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setLiveValues((previous) =>
        previous.map((value, index) => {
          const { min, max } = liveSignals[index];
          const variation = Math.random() < 0.6 ? 1 : -1;
          const step = Math.ceil(Math.random() * 2);
          let next = value + variation * step;
          if (next > max) {
            next = min + Math.floor(Math.random() * (max - min));
          }
          if (next < min) {
            next = min;
          }
          return next;
        }),
      );
    }, 3200);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto flex max-w-6xl flex-col gap-14 px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6"
        >
          <Image
            src="/assets/main/logo-sm.png"
            alt="Web Difference logo"
            width={140}
            height={140}
            className="h-auto w-[96px] sm:w-[120px]"
            priority
          />
          <span className="w-fit rounded-full bg-[color:rgba(0,224,255,0.12)] px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
            Web Difference
          </span>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl text-white">
            Agence web n°1 pour{" "}
            <span className="bg-gradient-to-r from-[#6C63FF] to-[#00E0FF] bg-clip-text text-transparent">
              site vitrine, e-commerce, SaaS, mobile, SEO et maintenance
            </span>
            .
          </h1>
          <p className="max-w-2xl text-lg text-white/75 md:text-xl">
            Simple. Rapide. Pro. Sans jargon technique. Nous construisons votre
            présence en ligne, la faisons vivre et l&apos;optimisons avec un
            accompagnement humain renforcé par des automatisations intelligentes.
          </p>
          <p className="max-w-xl text-sm uppercase tracking-[0.3em] text-white/60">
            Votre futur site, boutique, app mobile, SEO ou maintenance : on s&apos;en occupe.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/devis"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-secondary)] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-[rgba(108,99,255,0.3)] transition hover:shadow-[rgba(0,224,255,0.35)]"
            >
              Obtenir un devis instantané
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white/80 transition hover:border-[color:var(--color-secondary)] hover:text-white"
            >
              Parler à un expert en 24h
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex w-full flex-col gap-6 rounded-3xl border border-white/10 bg-[color:var(--color-surface)]/90 p-8 backdrop-blur-lg md:flex-row md:items-center md:justify-between"
        >
          <div className="flex-1">
            <p className="text-sm font-medium uppercase tracking-[0.35em] text-white/60">
              Preuves en toute transparence
            </p>
            <div className="mt-4 flex flex-wrap gap-6 text-sm text-white/75">
              <div>
                <p className="text-2xl font-semibold text-white">
                  4.9<span className="text-sm text-white/65">/5</span>
                </p>
                <p className="text-xs uppercase tracking-[0.25em] text-white/60">
                  Avis clients
                </p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-white">+120</p>
                <p className="text-xs uppercase tracking-[0.25em] text-white/60">
                  Projets livrés
                </p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-white">+68%</p>
                <p className="text-xs uppercase tracking-[0.25em] text-white/60">
                  Croissance constatée
                </p>
              </div>
            </div>
            <div
              className="mt-6 grid gap-4 rounded-2xl border border-white/10 bg-[color:rgba(108,99,255,0.08)] p-4 text-white/85 sm:grid-cols-3"
              aria-live="polite"
            >
              {liveSignals.map((signal, index) => {
                const liveValue = liveValues[index] ?? signal.start;
                return (
                  <div
                    key={signal.label}
                    className="rounded-xl bg-gradient-to-br from-[color:rgba(108,99,255,0.25)] via-[color:rgba(0,224,255,0.18)] to-[color:rgba(108,99,255,0.15)] p-4 shadow-inner shadow-[rgba(0,224,255,0.12)]"
                  >
                    <p className="text-xs uppercase tracking-[0.3em] text-white/65">
                      {signal.label}
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-[color:var(--color-secondary)]">
                      {liveValue.toLocaleString("fr-FR")}
                      {signal.suffix}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-auto flex-wrap items-center gap-4 text-xs uppercase tracking-[0.3em] text-white/50">
            {clientLogos.map((logo) => (
              <span key={logo} className="whitespace-nowrap">
                {logo}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 1.2 }}
      >
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:rgba(108,99,255,0.25)] blur-[220px]" />
        <div className="absolute left-1/4 top-1/4 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:rgba(0,224,255,0.18)] blur-[200px]" />
      </motion.div>
    </section>
  );
}
