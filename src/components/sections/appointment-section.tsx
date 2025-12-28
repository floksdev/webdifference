"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

export function AppointmentSection() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="border-t border-white/10 py-16" suppressHydrationWarning>
      <div className="mx-auto max-w-7xl px-6" suppressHydrationWarning>
        <div className="flex flex-col gap-3 text-center mb-16" style={{ position: "relative", zIndex: 50 }}>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Alors, <span className="text-[#71DDAE] text-4xl sm:text-5xl font-bold">quand</span> est ce qu'on <span className="text-[#71DDAE] text-4xl sm:text-5xl font-bold">commence</span> ?
          </h2>
        </div>
        <div
          className="calendly-inline-widget"
          data-url="https://calendly.com/webdifference/nouvelle-reunion?hide_gdpr_banner=1&background_color=282828&text_color=ffffff&primary_color=71ddae"
          style={{ minWidth: "320px", height: "700px", minHeight: "700px", width: "100%", marginTop: "1rem", position: "relative", zIndex: 1 }}
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

