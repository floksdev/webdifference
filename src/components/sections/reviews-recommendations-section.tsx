import Image from "next/image";

type Testimonial = {
  id: string;
  company: string;
  content: string;
  author: string;
  role: string;
  icon?: string;
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
    icon: '/assets/main/verdiavis.png',
  },
  {
    id: 'rec-2',
    company: 'JWL Marketing',
    content:
      "Tristan comprend vite les enjeux, imagine des solutions et livre un résultat impeccable. Collaboration fluide et efficace.",
    author: 'Jodie',
    role: 'CEO chez JWL Marketing',
    icon: '/assets/main/jwlavis.png',
  },
  {
    id: 'rec-3',
    company: 'KS Distrib',
    content:
      'Excellent développeur, compétent, réactif et disponible. Vous pouvez lui faire confiance.',
    author: 'Moustapha',
    role: 'Client freelance',
    icon: '/assets/main/ksdistribavis.png',
  },
  {
    id: 'rec-4',
    company: 'Freelance',
    content:
      'Écoute, pédagogie, pistes pertinentes et exécution soignée. Travaux livrés dans les temps avec un vrai souci du détail.',
    author: 'Noah',
    role: 'Client freelance',
  },
];

export default function ReviewsRecommendationsSection() {
  return (
    <section className="border-t border-white/10 py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6">
        {/* Header centré */}
        <div className="flex flex-col gap-3 text-center">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Ils nous font{' '}
            <span 
              className="text-4xl sm:text-5xl font-bold inline-block"
              style={{
                background: 'linear-gradient(135deg, #FAFAFA 0%, #E6E6E6 25%, #CFCFCF 50%, #B8B8B8 75%, #9E9E9E 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              confiance
            </span>
          </h2>
        </div>

        {/* Grille 2 colonnes avec décalage comme l'image */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          {bestTestimonials.map((testimonial, index) => (
            <article
              key={testimonial.id}
              className={`group relative flex flex-col rounded-3xl p-4 sm:p-6 md:p-8 pb-4 sm:pb-0 transition-all duration-300 min-h-[240px] sm:h-[280px] overflow-hidden ${
                index === 0 ? '' : index === 1 ? 'md:mt-12' : index === 2 ? 'md:-mt-8' : index === 3 ? 'md:mt-4' : ''
              }`}
              style={{
                background: 'linear-gradient(135deg, #FAFAFA 0%, #E6E6E6 25%, #CFCFCF 50%, #B8B8B8 75%, #9E9E9E 100%)',
                boxShadow: '0 20px 60px rgba(158, 158, 158, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.3)'
              }}
            >
              {/* Overlay brillant pour effet métallique */}
              <div 
                className="absolute inset-0 rounded-3xl pointer-events-none opacity-30"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, transparent 50%, rgba(0, 0, 0, 0.1) 100%)'
                }}
              />
              {/* Header premium avec auteur en badge */}
              <div className="mb-4 sm:mb-6">
                <div className="flex items-start justify-between mb-3 sm:mb-4 gap-3">
                  <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-[#1C1C1C] flex items-center justify-center shrink-0 shadow-lg">
                      <span className="text-white text-sm sm:text-base font-bold">
                    {testimonial.company.charAt(0).toUpperCase()}
                  </span>
                </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <h3 className="text-lg sm:text-xl font-extrabold text-black leading-tight truncate">
                  {testimonial.company}
                      </h3>
                      <div className="flex items-center gap-0.5 sm:gap-1 mt-1">
                {Array.from({ length: 5 }).map((_, idx) => (
                          <span key={idx} className="text-black text-xs sm:text-sm">★</span>
                ))}
              </div>
                    </div>
                  </div>
                  {/* Badge auteur en haut à droite */}
                  <div className="flex items-center gap-1.5 sm:gap-2 rounded-full bg-black/10 px-2 sm:px-3 py-1 sm:py-1.5 shrink-0">
                    <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-[#1C1C1C] flex items-center justify-center shrink-0">
                      <span className="text-white text-[9px] sm:text-[10px] font-bold">
                    {testimonial.author.charAt(0).toUpperCase()}
                  </span>
                </div>
                    <span className="text-[10px] sm:text-xs font-semibold text-black whitespace-nowrap">
                    {testimonial.author}
                  </span>
                  </div>
                </div>
              </div>

              {/* Témoignage premium */}
              <div className="flex-1 flex items-start">
                <p className="text-sm sm:text-base text-black/90 leading-relaxed font-medium">
                  {testimonial.content}
                </p>
            </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
