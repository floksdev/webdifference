"use client";

import Script from "next/script";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { FaCalendarAlt, FaExternalLinkAlt } from "react-icons/fa";

export function AppointmentSection() {
  const [calendlyUrl, setCalendlyUrl] = useState<string>(
    "https://calendly.com/webdifference/nouvelle-reunion?background_color=71ddae&primary_color=000000&text_color=000000"
  );
  const [showFallback, setShowFallback] = useState(false);
  const [storageAccessGranted, setStorageAccessGranted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    // Ajouter le paramètre embed_domain pour résoudre les problèmes de cookies
    if (typeof window !== "undefined") {
      const embedDomain = window.location.hostname;
      const baseUrl = "https://calendly.com/webdifference/nouvelle-reunion";
      const params = new URLSearchParams({
        background_color: "71ddae",
        primary_color: "000000",
        text_color: "000000",
        embed_domain: embedDomain,
      });
      setCalendlyUrl(`${baseUrl}?${params.toString()}`);
    }
  }, []);

  // Charger Calendly uniquement quand la section est visible (Intersection Observer)
  // Cela économise ~1 Mo de JS et 461 KiB de CSS au chargement initial
  useEffect(() => {
    if (!sectionRef.current || typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect(); // Arrêter l'observation une fois visible
          }
        });
      },
      {
        rootMargin: "200px", // Commencer à charger 200px avant que la section soit visible
        threshold: 0.1,
      }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  // Détecter si le widget Calendly ne se charge pas (cookies bloqués)
  // Ne s'exécute que quand la section est visible
  useEffect(() => {
    if (!isVisible || typeof window === "undefined" || !widgetRef.current) return;

    // Vérifier si l'API Storage Access est disponible et si on a déjà l'accès
    const checkStorageAccess = async () => {
      if ("hasStorageAccess" in document) {
        try {
          const hasAccess = await (document as any).hasStorageAccess();
          if (hasAccess) {
            setStorageAccessGranted(true);
          }
        } catch (err) {
          // Ignorer les erreurs silencieusement
        }
      }
    };

    checkStorageAccess();

    // Détecter si le widget Calendly ne se charge pas après un délai
    const checkWidgetLoad = setTimeout(() => {
      if (widgetRef.current) {
        const iframe = widgetRef.current.querySelector('iframe[src*="calendly.com"]') as HTMLIFrameElement;
        if (!iframe || (iframe && iframe.contentWindow === null)) {
          setShowFallback(true);
        }
      } else {
        // Si le widget n'existe toujours pas après 3 secondes, proposer l'alternative
        setShowFallback(true);
      }
    }, 3000);

    return () => clearTimeout(checkWidgetLoad);
  }, [calendlyUrl, isVisible]);

  const handleOpenInNewWindow = () => {
    window.open(calendlyUrl, '_blank', 'noopener,noreferrer');
  };

  const handleRequestStorageAccess = async () => {
    if ("requestStorageAccess" in document) {
      try {
        await (document as any).requestStorageAccess();
        setStorageAccessGranted(true);
        setShowFallback(false);
        // Recharger le widget
        if (widgetRef.current) {
          const widget = widgetRef.current.querySelector('.calendly-inline-widget');
          if (widget && (window as any).Calendly) {
            (window as any).Calendly.initInlineWidget({
              url: calendlyUrl,
              parentElement: widget,
            });
          }
        }
      } catch (err) {
        console.log("Accès au stockage refusé:", err);
      }
    }
  };

  return (
    <>
      {/* Charger le script Calendly uniquement quand la section est visible */}
      {isVisible && (
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="lazyOnload"
        />
      )}
      <section 
        ref={sectionRef}
        className="border-t border-white/10 py-16" 
        style={{ overflow: 'visible' }}
      >
        <div className="mx-auto max-w-7xl px-6 flex flex-col" style={{ overflow: 'visible' }}>
          {/* Titre */}
          <div className="flex flex-col gap-3 text-center mb-2">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Alors, <span className="text-[#71DDAE] text-4xl sm:text-5xl font-bold">quand</span> est ce qu'on <span className="text-[#71DDAE] text-4xl sm:text-5xl font-bold">commence</span> ?
            </h2>
          </div>

          {/* Message informatif si les cookies sont bloqués */}
          {showFallback && !storageAccessGranted && (
            <div className="mb-4 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
              <p className="text-white/90 text-sm mb-3">
                Pour utiliser le calendrier intégré, nous avons besoin d'accéder aux cookies de Calendly. 
                Cela nous permet de vous offrir une meilleure expérience de prise de rendez-vous.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                {"requestStorageAccess" in document && (
                  <button
                    onClick={handleRequestStorageAccess}
                    className="px-4 py-2 rounded-lg bg-[#71DDAE] text-[#1C1C1C] font-semibold hover:bg-[#5FC89A] transition-colors text-sm"
                  >
                    Autoriser l'accès
                  </button>
                )}
                <button
                  onClick={handleOpenInNewWindow}
                  className="px-4 py-2 rounded-lg bg-[#1C1C1C] text-white font-semibold hover:bg-[#2C2C2C] transition-colors text-sm flex items-center justify-center gap-2"
                >
                  <FaExternalLinkAlt />
                  Ouvrir dans une nouvelle fenêtre
                </button>
              </div>
            </div>
          )}

          {/* Widget Calendly avec image en overlay */}
          <div className="relative mt-4" style={{ overflow: 'visible' }}>
            {/* Widget Calendly - prend toute la largeur */}
            {/* Afficher un placeholder jusqu'à ce que Calendly soit chargé */}
            {!isVisible ? (
              <div className="w-full bg-white/5 rounded-2xl flex items-center justify-center" style={{ minHeight: "700px" }}>
                <div className="text-center text-white/70">
                  <FaCalendarAlt className="text-4xl mx-auto mb-4" />
                  <p className="text-lg">Chargement du calendrier...</p>
                </div>
              </div>
            ) : (
              <div className="w-full" ref={widgetRef}>
                <div 
                  className="calendly-inline-widget" 
                  data-url={calendlyUrl}
                  style={{ 
                    minWidth: "320px",
                    height: "700px",
                    width: "100%"
                  }}
                />
              </div>
            )}

            {/* Bouton de secours toujours visible */}
            <div className="absolute bottom-4 right-4 z-20">
              <button
                onClick={handleOpenInNewWindow}
                className="px-4 py-2 rounded-lg bg-[#1C1C1C] text-white font-semibold hover:bg-[#2C2C2C] transition-colors text-sm flex items-center gap-2 shadow-lg"
                title="Ouvrir dans une nouvelle fenêtre"
              >
                <FaExternalLinkAlt />
                <span className="hidden sm:inline">Nouvelle fenêtre</span>
              </button>
            </div>

            {/* Image en overlay à droite */}
            <div className="absolute right-0 top-0 pt-32 pointer-events-none hidden lg:block z-10" style={{ transform: 'translateX(calc(100% - 240px))' }}>
              <Image
                src="/robotrdv.png"
                alt="Prendre rendez-vous"
                width={280}
                height={280}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}




