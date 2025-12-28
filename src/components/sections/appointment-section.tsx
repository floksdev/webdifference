"use client";

import Script from "next/script";
import { useEffect, useState, useRef } from "react";

export function AppointmentSection() {
  const [isMounted, setIsMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !sectionRef.current || !widgetRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Quand la section entre dans le viewport
          if (entry.isIntersecting) {
            const widget = widgetRef.current;
            if (!widget) return;

            // Vérifier si le widget a déjà un iframe chargé
            const hasIframe = widget.querySelector('iframe');
            
            // Si pas d'iframe, forcer le rechargement
            if (!hasIframe && typeof window !== 'undefined' && (window as any).Calendly) {
              // Nettoyer et recréer le widget
              widget.innerHTML = '';
              widget.setAttribute('data-url', 'https://calendly.com/webdifference/nouvelle-reunion?hide_gdpr_banner=1&background_color=282828&text_color=ffffff&primary_color=71ddae');
              
              // Forcer Calendly à détecter le widget
              setTimeout(() => {
                // Le script Calendly devrait détecter automatiquement le widget
                // Mais on peut aussi essayer de déclencher manuellement
                if ((window as any).Calendly && (window as any).Calendly.initInlineWidget) {
                  try {
                    (window as any).Calendly.initInlineWidget({
                      url: "https://calendly.com/webdifference/nouvelle-reunion?hide_gdpr_banner=1&background_color=282828&text_color=ffffff&primary_color=71ddae",
                      parentElement: widget,
                    });
                  } catch (e) {
                    // Si ça échoue, on laisse le script automatique faire son travail
                  }
                }
              }, 100);
            }
          }
        });
      },
      {
        threshold: 0.1, // Déclencher quand 10% de la section est visible
      }
    );

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isMounted]);

  return (
    <section ref={sectionRef} className="border-t border-white/10 py-16" suppressHydrationWarning>
      <div className="mx-auto max-w-7xl px-6" suppressHydrationWarning>
        <div className="flex flex-col gap-3 text-center">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Alors, <span className="text-[#71DDAE] text-4xl sm:text-5xl font-bold">quand</span> est ce qu'on <span className="text-[#71DDAE] text-4xl sm:text-5xl font-bold">commence</span> ?
          </h2>
        </div>
        <div
          ref={widgetRef}
          className="calendly-inline-widget"
          data-url="https://calendly.com/webdifference/nouvelle-reunion?hide_gdpr_banner=1&background_color=282828&text_color=ffffff&primary_color=71ddae"
          style={{ minWidth: "320px", height: "700px", minHeight: "700px", width: "100%" }}
          suppressHydrationWarning
        />
        {isMounted && (
          <Script
            src="https://assets.calendly.com/assets/external/widget.js"
            strategy="afterInteractive"
          />
        )}
      </div>
    </section>
  );
}

