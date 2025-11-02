const products = [
  {
    title: "Site vitrine nouvelle génération",
    description:
      "Identité claire, SEO prêt à performer et pages optimisées pour transformer les visiteurs en clients.",
    details: ["Charte sur mesure", "Pages clés prêtes", "Optimisé mobile & SEO"],
  },
  {
    title: "Boutique e-commerce performante",
    description:
      "Parcours d’achat fluide, intégrations paiement et automatisations marketing déjà connectées.",
    details: ["Tunnel de conversion optimisé", "Automations email & social", "Dashboard ventes en direct"],
  },
  {
    title: "App, portail ou SaaS personnalisé",
    description:
      "Prototype validé rapidement, stack moderne et accompagnement produit pour lancer sans friction.",
    details: ["Prototype interactif 72h", "Intégrations tierces prêtes", "Support & roadmap évolutive"],
  },
];

export function ProductSection() {
  return (
    <section className="border-t border-white/10 bg-[color:var(--color-background-strong)] py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6">
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">
          Et qu&apos;est-ce que vous proposez ?
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.title}
              className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-[color:var(--color-surface)]/85 p-6 shadow-[0_18px_42px_rgba(8,20,32,0.28)]"
            >
              <h3 className="text-xl font-semibold text-white">{product.title}</h3>
              <p className="text-sm text-white/70">{product.description}</p>
              <ul className="mt-2 space-y-2 text-sm text-white/65">
                {product.details.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[color:var(--color-secondary)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
