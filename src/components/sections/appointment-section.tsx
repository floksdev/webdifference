"use client";

import { useEffect } from "react";
import { FaCheck } from "react-icons/fa";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement | null;
      }) => void;
    };
  }
}

export function AppointmentSection() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.Calendly) {
        window.Calendly.initInlineWidget({
          url: "https://calendly.com/webdifference/nouvelle-reunion",
          parentElement: document.getElementById("calendly-embed"),
        });
      }
    };

    return () => {
      // Cleanup: remove script if component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <section className="border-t border-white/10 py-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 lg:flex-row lg:items-start">
        {/* Colonne gauche */}
        <div className="flex-1 space-y-8">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2">
              On discute de votre projet ? ☕
            </h2>
          </div>

          {/* Étapes */}
          <div className="space-y-6 relative">
            {/* Ligne verticale */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#71DDAE] via-[#71DDAE]/50 to-transparent" />

            {/* Étape 1 */}
            <div className="relative flex items-start gap-4">
              <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#71DDAE] to-[#2A9D7A] border-2 border-[#1C1C1C] shadow-lg">
                <FaCheck className="text-white text-sm" />
              </div>
              <div className="pt-2">
                <p className="text-lg font-semibold text-white">
                  Vous prenez rendez-vous
                </p>
              </div>
            </div>

            {/* Étape 2 */}
            <div className="relative flex items-start gap-4">
              <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1C1C1C]/50 border-2 border-white/20">
                <span className="text-white text-sm font-bold">02</span>
              </div>
              <div className="pt-2">
                <p className="text-lg font-semibold text-white">
                  On clarifie vos besoins
                </p>
              </div>
            </div>

            {/* Étape 3 */}
            <div className="relative flex items-start gap-4">
              <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1C1C1C]/50 border-2 border-white/20">
                <span className="text-white text-sm font-bold">03</span>
              </div>
              <div className="pt-2">
                <p className="text-lg font-semibold text-white">
                  Web Difference se met au boulot !
                </p>
              </div>
            </div>
          </div>

          {/* Texte clients */}
          <p className="text-base text-white/80 leading-relaxed">
            300+ clients ont obtenu des résultats concrets en faisant appel à nos services, pourquoi pas vous ?
          </p>

          {/* Logos clients */}
          <div className="flex flex-wrap items-center gap-6 opacity-60">
            <span className="text-2xl font-bold text-white">ENGIE</span>
            <span className="text-2xl font-bold text-white">Vinted</span>
            <span className="text-2xl font-bold text-white">CENTURY 21</span>
            <span className="text-2xl font-bold text-white">RENAULT</span>
          </div>
        </div>

        {/* Colonne droite - Calendly Widget */}
        <div className="flex-1 lg:max-w-md">
          <p className="text-lg text-white/80 italic mb-4 text-center lg:text-left">
            Soyez pas timides!
            <span className="inline-block ml-2 text-[#71DDAE]">↓</span>
          </p>

          <div className="rounded-2xl bg-gradient-to-br from-[#1C1C1C]/80 to-[#1C1C1C]/60 border border-[#71DDAE]/30 backdrop-blur-sm shadow-lg overflow-hidden">
            <div
              id="calendly-embed"
              style={{ minWidth: "320px", height: "700px" }}
            />
          </div>
        </div>
        </div>
      </section>
  );
}




