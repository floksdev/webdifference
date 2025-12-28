import { PortfolioPreviewSection } from "@/components/sections/portfolio-preview-section";
import Link from "next/link";
import Image from "next/image";
import { FaCalendarAlt } from "react-icons/fa";

export default function ProjetsPage() {
  return (
    <main className="flex-1 bg-[color:var(--color-background-strong)]">
      <PortfolioPreviewSection />
      
      {/* Section "Besoin d'un boost de visibilité ?" */}
      <section className="border-t border-white/10 bg-[color:var(--color-background-strong)] py-24">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:gap-12 px-6">
          <div className="flex flex-col gap-6 text-center items-center">
            <h2 className="text-3xl font-semibold sm:text-4xl text-white">
              Besoin d'un <span className="text-[#71DDAE] text-4xl sm:text-5xl font-bold underline">boost</span> de <span className="text-[#71DDAE] text-4xl sm:text-5xl font-bold">visibilité</span> ?
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 lg:items-start mt-4 sm:mt-12">
            {/* Image à gauche */}
            <div className="relative w-full flex items-center justify-center">
              <div className="relative w-full max-w-[60%] sm:max-w-xs h-auto">
                <Image
                  src="/misenavant4.png"
                  alt="Mise en avant"
                  width={320}
                  height={240}
                  className="object-contain rounded-2xl"
                  sizes="(max-width: 640px) 60vw, (max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Carte recommandée à droite */}
            <div className="flex flex-col justify-center">
              <div className="space-y-6">
                <article className="group relative flex flex-col gap-6 rounded-3xl p-4 sm:p-8 transition-all duration-300 bg-gradient-to-r from-[#71DDAE] to-[#2A9D7A] shadow-[0_20px_60px_rgba(113,221,174,0.3)] hover:shadow-[0_25px_80px_rgba(113,221,174,0.4)]">

                  <div className="relative z-10">
                    {/* Image du site en gros */}
                    <div className="relative w-full overflow-hidden rounded-2xl bg-[#1C1C1C] mb-6 aspect-video">
                      <Image
                        src="/futursite2.png"
                        alt="Votre projet mis en avant"
                        fill
                        className="object-cover"
                        quality={75}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 768px"
                        loading="lazy"
                      />
                    </div>
                    
                    {/* Titre */}
                    <div className="text-center mb-4">
                      <h3 className="text-3xl sm:text-4xl font-extrabold text-black mb-3">
                        Votre projet est mis en avant !
                      </h3>
                    </div>
                    
                    {/* Sous-titre / Description */}
                    <p className="text-lg text-black/85 leading-relaxed text-center max-w-xl mx-auto mb-6">
                      Bonne nouvelle ! Votre site web rejoint nos réalisations et bénéficie d'une présentation soignée et interactive sur notre site.
                    </p>
                    
                    {/* CTA */}
                    <div className="text-center">
                      <Link
                        href="https://calendly.com/webdifference/nouvelle-reunion?hide_gdpr_banner=1&background_color=282828&text_color=ffffff&primary_color=71ddae&month=2025-12"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#1C1C1C] px-8 py-4 text-base font-bold text-white shadow-[0_8px_24px_rgba(28,28,28,0.4)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_32px_rgba(28,28,28,0.5)] active:scale-100"
                      >
                        <FaCalendarAlt className="text-xl" />
                        <span>Réserver un appel gratuit</span>
                        <span className="text-xl">→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

