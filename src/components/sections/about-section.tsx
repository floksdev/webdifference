import Link from "next/link";

const timeline = [
  {
    year: "2016",
    text: "Premiers sites vitrines et boutiques livrés pour artisans et commerces locaux.",
  },
  {
    year: "2019",
    text: "Accompagnement de franchises et PME : processus clarifiés, maintenance continue.",
  },
  {
    year: "2021",
    text: "Ouverture aux projets SaaS et applications métiers avec méthode orientée résultats.",
  },
  {
    year: "2024",
    text: "Création de Web Difference : automatisations et pédagogie au service de la simplicité.",
  },
];

export function AboutSection() {
  return (
    <section className="border-t border-white/10 bg-[color:var(--color-background-strong)] py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              À propos de Tristan · fondateur
            </h2>
            <p className="text-base text-white/70">
              8 ans d&apos;accompagnement auprès de dirigeants, responsables
              marketing et entrepreneurs qui veulent un site ou une application
              qui fonctionne tout de suite, sans jargon et avec un seul contact.
            </p>
            <ul className="space-y-2 text-sm text-white/70">
              <li>• +120 projets livrés : vitrine, e-commerce, SaaS, SEO, maintenance</li>
              <li>• Méthode : écoute, plan clair, tutoriels vidéo et disponibilité</li>
              <li>• Clients accompagnés : santé, restauration, industrie, services, tech</li>
            </ul>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-secondary)] px-5 py-3 text-sm font-semibold uppercase text-white transition hover:shadow-lg hover:shadow-[rgba(0,224,255,0.25)]"
              >
                Demander un échange rapide
              </Link>
              <Link
                href="https://cal.com"
                className="inline-flex items-center rounded-full border border-white/20 px-5 py-3 text-sm font-semibold uppercase text-white/80 transition hover:border-[color:var(--color-secondary)] hover:text-white"
              >
                Choisir un créneau visio
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
