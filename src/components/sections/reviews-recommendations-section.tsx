type Testimonial = {
  id: string;
  company: string;
  content: string;
  author: string;
  role: string;
};

// Les 4 meilleurs témoignages sélectionnés
const bestTestimonials: Testimonial[] = [
  {
    id: 'rec-1',
    company: 'Verdi events',
    content:
      "Site e-commerce complet, référencement au top, automatisations adaptées. Professionnalisme et vitesse d'exécution impeccables.",
    author: 'Corinne',
    role: 'CEO chez Verdi events',
  },
  {
    id: 'rec-2',
    company: 'JWL Marketing',
    content:
      "Tristan comprend vite les enjeux, imagine des solutions et livre un résultat impeccable. Collaboration fluide et efficace.",
    author: 'Jodie',
    role: 'CEO chez JWL Marketing',
  },
  {
    id: 'rec-3',
    company: 'Freelance',
    content:
      'Excellent développeur, compétent, réactif et disponible. Vous pouvez lui faire confiance.',
    author: 'vendeur921',
    role: 'Client freelance',
  },
  {
    id: 'rec-4',
    company: 'Freelance',
    content:
      'Écoute, pédagogie, pistes pertinentes et exécution soignée. Travaux livrés dans les temps avec un vrai souci du détail.',
    author: 'Noah Descaves',
    role: 'Client freelance',
  },
];

export default function ReviewsRecommendationsSection() {
  return (
    <section className="border-t border-white/10 py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6">
        {/* Header aligné à gauche comme dans l'image */}
        <div className="flex flex-col gap-2">
          <h2 className="text-4xl font-bold text-white">
            Nos clients témoignent
          </h2>
          <p className="text-lg text-white/70 italic">
            Il ne manque plus que vous 😉
            <span className="inline-block ml-2 text-[#71DDAE]">↓</span>
          </p>
        </div>

        {/* Grille 2x2 avec cartes séparées */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bestTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group relative flex flex-col gap-4 rounded-2xl bg-gradient-to-br from-[#71DDAE]/15 to-[#2A9D7A]/15 border border-[#71DDAE]/30 backdrop-blur-sm shadow-lg p-6 hover:border-[#71DDAE]/50 transition-all duration-300"
            >
              {/* Nom de l'entreprise en haut */}
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#71DDAE] to-[#2A9D7A] flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {testimonial.company.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm font-semibold text-white">
                  {testimonial.company}
                </span>
              </div>

              {/* 5 étoiles */}
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <span key={idx} className="text-[#71DDAE] text-lg">★</span>
                ))}
              </div>

              {/* Témoignage */}
              <p className="text-sm text-white/85 leading-relaxed flex-1">
                "{testimonial.content}"
              </p>

              {/* Infos client en bas */}
              <div className="flex items-center gap-3 pt-2 border-t border-[#71DDAE]/20">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#71DDAE] to-[#2A9D7A] flex items-center justify-center shrink-0">
                  <span className="text-white text-xs font-bold">
                    {testimonial.author.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-white">
                    {testimonial.author}
                  </span>
                  <span className="text-xs text-white/60">
                    {testimonial.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
