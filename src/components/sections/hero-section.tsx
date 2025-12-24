"use client";

import Image from "next/image";
import Link from "next/link";
import { FaCalendarAlt } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";

export function HeroSection() {

  return (
    <section className="relative overflow-hidden" suppressHydrationWarning>
      <div className="mx-auto flex max-w-6xl flex-col gap-14 px-4 py-12 sm:px-6 sm:py-16 md:py-24">
        <div className="flex flex-col items-center gap-6 text-center">
          {/* Badge avec animation légère */}
          {/* Suppression de l'animation initiale pour éviter les erreurs d'hydratation */}
          <div className="mb-4 inline-block w-full sm:w-auto">
            <div className="relative flex items-center gap-2 rounded-full border border-[#1C1C1C]/20 bg-[#FFFFFF] px-3 py-2.5 shadow-[0_18px_48px_rgba(0,0,0,0.32),0_0_20px_rgba(113,221,174,0.4),0_0_40px_rgba(113,221,174,0.2)] overflow-hidden sm:gap-4 sm:px-6 sm:py-3 sm:overflow-visible md:px-8 md:py-4">
              <Image
                src="/assets/main/fond-blanc/logo-sm.png"
                alt="Web Difference loupe"
                width={48}
                height={48}
                className="h-8 w-8 flex-shrink-0 sm:h-10 sm:w-10 md:h-12 md:w-12"
                priority
              />
              <p className="text-xs font-extrabold text-[#1C1C1C] overflow-hidden text-ellipsis whitespace-nowrap sm:text-base sm:overflow-visible sm:whitespace-nowrap md:text-lg lg:text-xl xl:text-2xl uppercase">
                Créer un site web <span className="underline decoration-3 underline-offset-4 decoration-[#1C1C1C]">vraiment</span> unique
              </p>
            </div>
          </div>
          {/* H1 critique pour LCP - visible immédiatement, pas d'animation */}
          {/* Le h1 est rendu immédiatement sans attendre l'animation JavaScript */}
          <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Votre <span className="text-[#71DDAE]">site</span> doit <span className="text-[#71DDAE]">donner envie</span> de <span className="text-[#71DDAE]">rester</span>, pas de <span className="line-through decoration-[#1C1C1C]"><span className="text-[#71DDAE]">revenir</span> <span className="text-white">en</span> <span className="text-[#71DDAE]">arrière</span></span>.
          </h1>
          {/* Paragraphe - animation supprimée pour éviter les erreurs d'hydratation */}
          <p className="max-w-lg text-base font-medium text-white/80 sm:max-w-2xl sm:text-lg md:text-xl">
            Design moderne,<br className="sm:hidden" /> SEO solide, Suivi complet :<br /> on construit un site qui retient vos visiteurs et vous apporte des résultats.
          </p>
          {/* CTA - animation supprimée pour éviter les erreurs d'hydratation */}
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <div className="relative w-full sm:w-auto sm:inline-flex">
              <Link
                href="https://calendly.com/webdifference/nouvelle-reunion"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#71DDAE] to-[#2A9D7A] px-6 py-3 text-lg font-extrabold tracking-wide text-[#1C1C1C] shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95 h-12 whitespace-nowrap sm:w-auto sm:px-8 sm:py-4 sm:text-xl md:px-8 md:py-4 md:text-2xl md:h-[68px]"
              >
                <FaCalendarAlt className="text-lg sm:text-xl md:text-2xl" />
                Prendre RDV
              </Link>
              <div className="absolute top-full -left-12 -mt-4 pointer-events-none hidden sm:block">
                <Image
                  src="/assets/main/unptitclick2.png"
                  alt="Un ptit click ?"
                  width={200}
                  height={150}
                  className="w-auto h-auto max-w-[200px]"
                />
              </div>
            </div>
            <Link
              href="#portfolio"
              className="inline-flex w-full items-center justify-center gap-3 rounded-xl border border-[#71DDAE] bg-[#1C1C1C]/50 backdrop-blur px-6 py-3 text-base font-extrabold tracking-wide text-[#71DDAE] transition-all duration-200 hover:bg-[#1C1C1C]/70 h-12 sm:w-auto sm:px-8 sm:py-4 sm:text-lg md:h-[68px]"
            >
              Découvrir nos projets
              <FaArrowDown className="text-xl" color="#71DDAE" />
            </Link>
          </div>
        </div>
      </div>

      {/* Effets de fond - animation supprimée pour éviter les erreurs d'hydratation */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" suppressHydrationWarning>
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:rgba(113,221,174,0.25)] blur-[120px] sm:h-[400px] sm:w-[400px] sm:blur-[160px] md:h-[520px] md:w-[520px] md:blur-[220px]" />
        <div className="absolute left-1/4 top-1/4 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:rgba(255,255,255,0.18)] blur-[100px] sm:h-[280px] sm:w-[280px] sm:blur-[140px] md:h-[360px] md:w-[360px] md:blur-[200px]" />
      </div>
    </section>
  );
}
