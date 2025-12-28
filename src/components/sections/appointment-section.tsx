"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

export function AppointmentSection() {
  const [isMounted, setIsMounted] = useState(false);
  const [widgetKey, setWidgetKey] = useState(0);

  useEffect(() => {
    setIsMounted(true);
    // Changer la clé à chaque montage pour forcer le rechargement
    setWidgetKey(prev => prev + 1);
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
              src="https://assets.calendly.com/assets/external/widget.js"
              strategy="afterInteractive"
            />
          </>
        )}
      </div>
    </section>
  );
}

