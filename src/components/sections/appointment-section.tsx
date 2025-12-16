"use client";

import { useEffect, useRef } from "react";

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
  const calendlyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Injecter du CSS pour forcer le texte en noir et corriger le positionnement
    const style = document.createElement("style");
    style.textContent = `
      .calendly-inline-widget {
        position: relative !important;
        width: 100% !important;
        min-width: 100% !important;
        max-width: 100% !important;
        height: 700px !important;
        overflow: hidden !important;
        left: 0 !important;
        top: 0 !important;
        margin: 0 !important;
        padding: 0 !important;
        background: transparent !important;
      }
      .calendly-inline-widget iframe {
        position: relative !important;
        width: 100% !important;
        height: 100% !important;
        border: none !important;
        left: 0 !important;
        top: 0 !important;
        margin: 0 !important;
        background: transparent !important;
        color-scheme: light;
      }
      .calendly-inline-widget,
      .calendly-inline-widget * {
        color: #000000 !important;
      }
      .calendly-inline-widget h1,
      .calendly-inline-widget h2,
      .calendly-inline-widget h3,
      .calendly-inline-widget h4,
      .calendly-inline-widget p,
      .calendly-inline-widget span,
      .calendly-inline-widget div,
      .calendly-inline-widget a {
        color: #000000 !important;
      }
    `;
    document.head.appendChild(style);

    // Charger le script Calendly
    let script = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]') as HTMLScriptElement;
    
    if (!script) {
      script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);
    }

    const initCalendly = () => {
      if (window.Calendly && calendlyRef.current) {
        window.Calendly.initInlineWidget({
          url: "https://calendly.com/webdifference/nouvelle-reunion?hide_gdpr_banner=1&background_color=cfcfcf&primary_color=1c1c1c&text_color=000000",
          parentElement: calendlyRef.current,
        });
      }
    };

    if (window.Calendly) {
      initCalendly();
    } else {
      script.onload = initCalendly;
    }

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <section className="border-t border-white/10 py-16">
      <div className="mx-auto max-w-7xl flex flex-col gap-12 px-6">
        {/* Header premium */}
        <div className="flex flex-col gap-3 text-center">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
            On discute de votre projet ?{' '}
            <span className="text-[#71DDAE]">☕</span>
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Réservez un créneau et échangez directement avec notre équipe pour transformer vos idées en réalité digitale.
          </p>
        </div>

        {/* Wrapper premium avec dégradé argenté */}
        <div 
          className="relative rounded-3xl overflow-hidden"
          style={{ 
            background: "linear-gradient(135deg, #FAFAFA 0%, #E6E6E6 25%, #CFCFCF 50%, #B8B8B8 75%, #9E9E9E 100%)",
            boxShadow: "0 20px 60px rgba(158, 158, 158, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(0, 0, 0, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            position: "relative",
            width: "100%"
          }}
        >
          {/* Overlay brillant pour effet métallique */}
          <div 
            className="absolute inset-0 rounded-3xl pointer-events-none opacity-30"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, transparent 50%, rgba(0, 0, 0, 0.1) 100%)',
              zIndex: 1
            }}
          />
          
          {/* Contenu du widget */}
          <div 
            ref={calendlyRef}
            className="calendly-inline-widget" 
            style={{ 
              position: "relative",
              zIndex: 2,
              width: "100%",
              minWidth: "100%",
              height: "700px"
            }}
          />
        </div>
      </div>
    </section>
  );
}




