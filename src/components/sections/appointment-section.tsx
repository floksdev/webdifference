"use client";

import Script from "next/script";

export function AppointmentSection() {
  return (
    <>
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
      <section className="border-t border-white/10 py-16">
        <div className="mx-auto max-w-7xl px-6 flex flex-col">
          {/* Titre */}
          <div className="flex flex-col gap-3 text-center mb-2">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Alors, <span className="text-[#71DDAE] text-4xl sm:text-5xl font-bold">quand</span> est ce qu'on <span className="text-[#71DDAE] text-4xl sm:text-5xl font-bold">commence</span> ?
            </h2>
          </div>

          {/* Widget Calendly */}
          <div 
            className="calendly-inline-widget mt-4" 
            data-url="https://calendly.com/webdifference/nouvelle-reunion?background_color=71ddae&primary_color=000000&text_color=000000"
            style={{ 
              minWidth: "320px",
              height: "700px",
              width: "100%"
            }}
          />
        </div>
      </section>
    </>
  );
}




