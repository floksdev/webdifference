"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto flex max-w-6xl flex-col gap-14 px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-6 text-center"
        >
          <div className="w-full max-w-3xl">
            <div className="mx-auto flex items-center gap-3 rounded-full border border-white/20 bg-[rgba(12,22,33,0.7)] px-6 py-3 shadow-[0_18px_48px_rgba(0,0,0,0.32)] backdrop-blur">
              <Image
                src="/assets/main/logo-sm.png"
                alt="Web Difference loupe"
                width={40}
                height={40}
                className="h-10 w-10"
                priority
              />
              <p className="text-sm font-semibold text-white/80 sm:text-base md:text-lg">
                Agence web n°1 pour site vitrine, e-commerce, SaaS, mobile, SEO et maintenance
              </p>
            </div>
          </div>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
            Votre site web professionnel, clé en main, optimisé pour la conversion
          </h1>
          <p className="max-w-2xl text-lg font-medium text-white/80 md:text-xl">
            Design sur-mesure, SEO expert, accompagnement humain. Confiez-nous votre projet, on fait tout le reste.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/devis"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-secondary)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[rgba(108,99,255,0.3)] transition hover:shadow-[rgba(0,224,255,0.35)]"
            >
              Obtenir un devis instantané
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-[color:var(--color-secondary)] hover:text-white"
            >
              Parler à un expert en 24h
            </Link>
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
