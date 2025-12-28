"use client";

import Script from "next/script";
import { useEffect, useState, useRef } from "react";

declare global {
  interface Window {
    Calendly: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
      }) => void;
    };
  }
}

export function AppointmentSection() {
  const [isMounted, setIsMounted] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && widgetRef.current && window.Calendly) {
      // Réinitialiser le widget à chaque montage
      const container = widgetRef.current;
      container.innerHTML = ''; // Nettoyer le contenu précédent
      
      window.Calendly.initInlineWidget({
        url: "https://calendly.com/webdifference/nouvelle-reunion?hide_gdpr_banner=1&background_color=282828&text_color=ffffff&primary_color=71ddae",
        parentElement: container,
      });
    }
  }, [isMounted]);

  const handleScriptLoad = () => {
    scriptLoadedRef.current = true;
    if (isMounted && widgetRef.current && window.Calendly) {
      const container = widgetRef.current;
      container.innerHTML = '';
      
      window.Calendly.initInlineWidget({
        url: "https://calendly.com/webdifference/nouvelle-reunion?hide_gdpr_banner=1&background_color=282828&text_color=ffffff&primary_color=71ddae",
        parentElement: container,
      });
    }
  };

  return (
    <section className="border-t border-white/10 py-16" suppressHydrationWarning>
      <div className="mx-auto max-w-7xl px-6" suppressHydrationWarning>
        <div className="flex flex-col gap-3 text-center">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Alors, <span className="text-[#71DDAE] text-4xl sm:text-5xl font-bold">quand</span> est ce qu'on <span className="text-[#71DDAE] text-4xl sm:text-5xl font-bold">commence</span> ?
          </h2>
        </div>
        <div
          ref={widgetRef}
          id="calendly-embed"
          style={{ minWidth: "320px", height: "700px", minHeight: "700px", width: "100%" }}
          suppressHydrationWarning
        />
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="afterInteractive"
          onLoad={handleScriptLoad}
        />
      </div>
    </section>
  );
}

