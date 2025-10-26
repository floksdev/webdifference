import type { Metadata } from "next";
import Link from "next/link";
import { ContactSection } from "@/components/sections/contact-section";

const contactOptions = [
  {
    label: "WhatsApp direct",
    value: "+33 6 00 00 00 00",
    href: "https://wa.me/33600000000",
  },
  {
    label: "Slack privé",
    value: "@tristan.webdifference",
    href: "https://join.slack.com",
  },
  {
    label: "Email",
    value: "bonjour@webdifference.app",
    href: "mailto:bonjour@webdifference.app",
  },
  {
    label: "Calendly 24h",
    value: "cal.com/tristan/webdifference",
    href: "https://cal.com/tristan/webdifference",
  },
];

export const metadata: Metadata = {
  title: "Contact & audit express",
  description:
    "Contactez Web Difference par WhatsApp, Slack, Calendly ou formulaire pour un audit différenciation en moins de 24h.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-24">
      <header className="space-y-6">
        <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/70">
          Contact express
        </div>
        <h1 className="text-3xl font-semibold sm:text-4xl md:text-5xl">
          Pose ta question, je te réponds en moins de 24h
        </h1>
        <p className="max-w-3xl text-base text-white/70 md:text-lg">
          Audit flash, estimation rapide, validation technique ou démo en live :
          choisis le canal qui te convient, je m&apos;adapte à ton besoin.
        </p>
      </header>

      <div className="grid gap-10 md:grid-cols-[1fr_1fr]">
        <ContactSection />
        <div className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-[color:var(--color-surface)]/70 p-6">
          <h2 className="text-xl font-semibold text-white">Canaux disponibles</h2>
          <ul className="space-y-4 text-sm text-white/70">
            {contactOptions.map((option) => (
              <li key={option.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                  {option.label}
                </p>
                <p className="mt-1 text-sm font-semibold text-white">{option.value}</p>
                <Link
                  href={option.href}
                  className="mt-2 inline-flex text-xs font-semibold uppercase text-[color:var(--color-secondary)]"
                >
                  Ouvrir →
                </Link>
              </li>
            ))}
          </ul>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">
              Bonus
            </p>
            <p className="mt-2">
              Après validation, tu reçois automatiquement : lien Calendly, ICS,
              accès portail client, checklists onboarding et Slack privé.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
