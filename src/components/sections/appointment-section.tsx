"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

export function AppointmentSection() {
  const [isMounted, setIsMounted] = useState(false);
  const [widgetKey, setWidgetKey] = useState(0);
  const [scriptKey, setScriptKey] = useState(0);

  useEffect(() => {
    setIsMounted(true);
    // Incrémenter les clés à chaque montage pour forcer React à recréer complètement
    setWidgetKey(prev => prev + 1);
    setScriptKey(prev => prev + 1);
    
    // Nettoyer les iframes Calendly existantes
    const existingIframes = document.querySelectorAll('.calendly-inline-widget iframe');
    existingIframes.forEach(iframe => iframe.remove());
    
    // Supprimer l'ancien script Calendly s'il existe
    const existingScript = document.querySelector('script[src*="calendly.com/assets/external/widget.js"]');
    if (existingScript) {
      existingScript.remove();
    }
    
    // Supprimer l'objet Calendly global pour forcer le rechargement
    if (typeof window !== 'undefined') {
      delete (window as any).Calendly;
    }
  }, []);

  return (
    <section className="border-t border-white/10 py-16" suppressHydrationWarning>
      <div className="mx-auto max-w-7xl px-6" suppressHydrationWarning>
        <div className="flex flex-col gap-3 text-center">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Alors, <span className="text-[#71DDAE] text-4xl sm:text-5xl font-bold">quand</span> est ce qu'on <span className="text-[#71DDAE] text-4xl sm:text-5xl font-bold">commence</span> ?
          </h2>
        </div>
        {isMounted && (
          <>
            <div
              key={widgetKey}
              className="calendly-inline-widget"
              data-url="https://calendly.com/webdifference/nouvelle-reunion?hide_gdpr_banner=1&background_color=282828&text_color=ffffff&primary_color=71ddae"
              style={{ minWidth: "320px", height: "700px", minHeight: "700px", width: "100%" }}
              suppressHydrationWarning
            />
            <Script
              key={`calendly-script-${scriptKey}`}
              src="https://assets.calendly.com/assets/external/widget.js"
              strategy="afterInteractive"
            />
          </>
        )}
      </div>
    </section>
  );
}

