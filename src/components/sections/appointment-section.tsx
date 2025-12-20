"use client";

import Script from "next/script";
import Image from "next/image";

export function AppointmentSection() {
  return (
    <>
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
      <section className="border-t border-white/10 py-16" style={{ overflow: 'visible' }}>
        <div className="mx-auto max-w-7xl px-6 flex flex-col" style={{ overflow: 'visible' }}>
          {/* Titre */}
          <div className="flex flex-col gap-3 text-center mb-2">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Alors, <span className="text-[#71DDAE] text-4xl sm:text-5xl font-bold">quand</span> est ce qu'on <span className="text-[#71DDAE] text-4xl sm:text-5xl font-bold">commence</span> ?
            </h2>
          </div>

          {/* Widget Calendly avec image en overlay */}
          <div className="relative mt-4" style={{ overflow: 'visible' }}>
            {/* Widget Calendly - prend toute la largeur */}
            <div className="w-full">
              <div 
                className="calendly-inline-widget" 
                data-url="https://calendly.com/webdifference/nouvelle-reunion?background_color=71ddae&primary_color=000000&text_color=000000"
                style={{ 
                  minWidth: "320px",
                  height: "700px",
                  width: "100%"
                }}
              />
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




