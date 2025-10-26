"use client";

import { useState } from "react";

export function ContactSection() {
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");

  return (
    <section className="border-t border-white/10 bg-[color:var(--color-background-strong)] py-24">
      <div className="mx-auto flex max-w-4xl flex-col gap-8 px-6 text-center">
        <h2 className="text-3xl font-semibold sm:text-4xl">
          Prêt à démarrer ou besoin d&apos;un conseil ?
        </h2>
        <p className="text-base text-white/70">
          Expliquez-nous votre situation : nous répondons sous 24h avec un
          devis clair, un créneau d&apos;appel et les prochaines étapes.
        </p>
        <form
          className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-[color:var(--color-surface)] p-6 text-left shadow-lg shadow-[rgba(108,99,255,0.15)]"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <label className="text-sm font-medium text-white/70">
            Email
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              placeholder="votre@email.com"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[color:rgba(14,22,31,0.65)] px-4 py-3 text-white outline-none transition focus:border-[color:var(--color-secondary)]"
            />
          </label>
          <label className="text-sm font-medium text-white/70">
            Votre besoin
            <textarea
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              rows={4}
              placeholder="Site vitrine, e-commerce, refonte, SEO, maintenance ou application… dites-nous tout."
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[color:rgba(14,22,31,0.65)] px-4 py-3 text-white outline-none transition focus:border-[color:var(--color-secondary)]"
            />
          </label>
          <button
            type="submit"
            className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-secondary)] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-[rgba(0,224,255,0.25)] transition hover:shadow-[rgba(108,99,255,0.3)]"
          >
            Recevoir un audit express
          </button>
          <p className="text-xs text-white/60">
            Après envoi, vous recevez automatiquement un récap, un lien de
            rendez-vous et l’accès à votre espace client sécurisé.
          </p>
        </form>
      </div>
    </section>
  );
}
