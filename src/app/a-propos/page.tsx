import type { Metadata } from "next";
import Link from "next/link";

const timeline = [
  { year: "2016", text: "Premiers MVP SaaS pour startups parisiennes." },
  { year: "2019", text: "Spécialisation Next.js · Automations Zapier / Notion." },
  { year: "2021", text: "Portefeuille international, accompagnement growth B2B." },
  { year: "2024", text: "Lancement Web Difference : IA + Ops automatisés." },
];

const certifications = [
  "Next.js Advanced",
  "Stripe Partner",
  "Zapier Expert+",
  "OpenAI Builder",
  "Notion Certified",
];

const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Prisma",
  "PostgreSQL",
  "Supabase",
  "OpenAI",
  "Stripe",
  "DocuSign",
  "Zapier",
  "Plausible",
];

export const metadata: Metadata = {
  title: "À propos de Web Difference",
  description:
    "Tristan, 8 ans d'expérience produit & automation. Découvrez la timeline, les certifications et la stack Web Difference.",
};

export default function AboutPage() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-24">
      <header className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-6">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/70">
            Moi c&apos;est Tristan
          </div>
          <h1 className="text-3xl font-semibold sm:text-4xl md:text-5xl">
            Je construis des expériences digitales différenciantes depuis 8 ans
          </h1>
          <p className="text-base text-white/70 md:text-lg">
            Produit, design, automation & IA : je mixe ces expertises pour livrer
            des projets qui performent dès J+1. Mon obsession : supprimer les
            frictions et créer des expériences mémorables, autant côté client que
            côté équipe.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-secondary)] px-5 py-3 text-sm font-semibold uppercase text-white"
            >
              Parler à Tristan en 24h
            </Link>
            <Link
              href="https://cal.com"
              className="inline-flex items-center rounded-full border border-white/20 px-5 py-3 text-sm font-semibold uppercase text-white/80 transition hover:border-[color:var(--color-secondary)] hover:text-white"
            >
              Réserver un créneau Calendly
            </Link>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-[color:var(--color-surface)]/70 p-6 text-sm text-white/75">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">
            Méthodologie
          </p>
          <ul className="mt-3 space-y-2">
            <li>1. Audit différenciation & prise de brief (90 min)</li>
            <li>2. Prototype & storytelling immersif (72h)</li>
            <li>3. Delivery full-stack + automatisations (2–4 semaines)</li>
            <li>4. Growth cockpit & optimisation continue (mensuel)</li>
          </ul>
        </div>
      </header>

      <section className="grid gap-10 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Timeline</h2>
          <div className="relative pl-4">
            <div className="absolute left-0 top-0 h-full w-px bg-white/15" />
            <ul className="space-y-6">
              {timeline.map((item) => (
                <li key={item.year} className="relative pl-6">
                  <span className="absolute left-0 top-1.5 h-2 w-2 -translate-x-[5px] rounded-full bg-[color:var(--color-secondary)]" />
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                    {item.year}
                  </p>
                  <p className="mt-2 text-sm text-white/75">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="space-y-6 rounded-3xl border border-white/10 bg-[color:var(--color-surface)]/70 p-6">
          <h2 className="text-2xl font-semibold text-white">Certifications</h2>
          <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em] text-white/60">
            {certifications.map((cert) => (
              <span
                key={cert}
                className="rounded-full border border-white/10 px-4 py-2"
              >
                {cert}
              </span>
            ))}
          </div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">
            Stack favorite
          </h3>
          <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.2em] text-white/55">
            {stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 px-3 py-1"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-[color:var(--color-surface)]/70 p-6">
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">
            Clients accompagnés
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li>• Alan</li>
            <li>• Shine</li>
            <li>• Sunday</li>
            <li>• Station F</li>
            <li>• FlowOps</li>
          </ul>
        </div>
        <div className="rounded-3xl border border-white/10 bg-[color:var(--color-surface)]/70 p-6">
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">
            Manifesto
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li>• Design différenciant & scrollytelling assumé.</li>
            <li>• Expérience client = prioritaire (automations, portail, IA).</li>
            <li>• Mesure de l&apos;impact en continu (analytics & growth ops).</li>
            <li>• Transparence sur les budgets, cycles courts, feedback constant.</li>
          </ul>
        </div>
        <div className="rounded-3xl border border-white/10 bg-[color:var(--color-surface)]/70 p-6">
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">
            Contact direct
          </h3>
          <p className="mt-3 text-sm text-white/70">
            Whatsapp, Slack privé ou visio Calendly. Je réponds en moins de 24h et
            on peut démarrer sous 48h.
          </p>
          <div className="mt-4 space-y-2 text-sm text-white/75">
            <Link
              href="https://wa.me/33600000000"
              className="block rounded-full border border-white/20 px-4 py-2 text-center text-xs font-semibold uppercase text-white/80 transition hover:border-[color:var(--color-secondary)] hover:text-white"
            >
              WhatsApp direct
            </Link>
            <Link
              href="https://cal.com"
              className="block rounded-full border border-white/20 px-4 py-2 text-center text-xs font-semibold uppercase text-white/80 transition hover:border-[color:var(--color-secondary)] hover:text-white"
            >
              Calendly 24h
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
}
