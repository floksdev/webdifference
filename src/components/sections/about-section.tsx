import Link from "next/link";

const timeline = [
  { year: "2016", text: "Premiers MVP SaaS livrés pour startups parisiennes." },
  { year: "2019", text: "Spécialisation Next.js · Automatisations Zapier/Notion." },
  { year: "2021", text: "Portefeuille international, accompagnement growth B2B." },
  { year: "2024", text: "Création de Web Difference : IA + Ops automatisés." },
];

export function AboutSection() {
  return (
    <section className="border-t border-white/10 bg-[color:var(--color-background-strong)] py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              À propos · Tristan
            </h2>
            <p className="text-base text-white/70">
              8 ans à challenger les codes du produit digital. J&apos;allie design,
              dev, automatismes et data pour lancer des expériences qui
              performent dès J+1.
            </p>
            <ul className="space-y-2 text-sm text-white/70">
              <li>• Certifié Next.js, Stripe, Zapier Expert+</li>
              <li>• Clients : Alan, Sunday, Shine, Station F</li>
              <li>• Stack : Next.js, React, Node.js, Prisma, OpenAI</li>
            </ul>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-secondary)] px-5 py-3 text-sm font-semibold uppercase text-white transition hover:shadow-lg hover:shadow-[rgba(0,224,255,0.25)]"
              >
                Parler à Tristan en 24h
              </Link>
              <Link
                href="https://cal.com"
                className="inline-flex items-center rounded-full border border-white/20 px-5 py-3 text-sm font-semibold uppercase text-white/80 transition hover:border-[color:var(--color-secondary)] hover:text-white"
              >
                Réserver un créneau
              </Link>
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">
              Timeline accélérée
            </h3>
            <div className="relative pl-4">
              <div className="absolute left-0 top-0 h-full w-px bg-white/20" />
              <ul className="space-y-6">
                {timeline.map((item) => (
                  <li key={item.year} className="relative pl-6">
                    <span className="absolute left-0 top-1.5 h-2 w-2 -translate-x-[5px] rounded-full bg-[color:var(--color-primary)]" />
                    <p className="text-sm uppercase tracking-[0.3em] text-white/50">
                      {item.year}
                    </p>
                    <p className="mt-2 text-sm text-white/70">{item.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
