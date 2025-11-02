"use client";

import Image from "next/image";
import { useState } from "react";

export default function ConversationSection() {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative flex flex-col items-center px-6 pt-12 pb-24">
      <div className="absolute inset-0 -z-20 bg-slate-950" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-700/10 via-slate-800/60 to-indigo-900/30" />
      <div className="absolute -top-64 right-1/2 h-[28rem] w-[28rem] rounded-full bg-indigo-500/25 blur-[140px]" />
      <div className="absolute -top-8 left-[60%] h-72 w-72 rounded-full bg-emerald-500/20 blur-[120px]" />

      <div className="relative w-full max-w-5xl">
        <div className="absolute inset-0 -z-10 rounded-[36px] bg-gradient-to-r from-indigo-500/25 via-purple-500/25 to-emerald-400/20 blur-2xl" />
        <div className="rounded-[36px] border border-white/15 bg-slate-950/85 p-4 backdrop-blur-xl shadow-[0_45px_110px_-55px_rgba(67,56,202,0.65)]">
          <div className="rounded-[28px] border border-white/10 bg-black/40 p-1">
            <div className="relative overflow-hidden rounded-[24px] border border-white/10">
              <div className="relative w-full pt-[56.25%]">
                {open ? (
                  <iframe
                    className="absolute inset-0 h-full w-full rounded-[20px]"
                    src="https://www.youtube.com/embed/ID_DE_LA_VIDEO?autoplay=1"
                    title="Démo Web Difference"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="group absolute inset-0 flex items-center justify-center overflow-hidden rounded-[20px] text-white"
                  >
                    <Image
                      src="/whatsapp-wallpaper2.jpg"
                      alt="Wallpaper"
                      fill
                      className="object-cover"
                      priority
                    />
                    <span className="absolute inset-0 bg-slate-950/60 backdrop-blur-[1px]" />
                    <span className="absolute h-[220%] w-[220%] rounded-full bg-[radial-gradient(circle,rgba(0,224,255,0.28)_0%,rgba(14,26,45,0)_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="relative inline-flex h-20 w-20 items-center justify-center rounded-2xl border border-white/20 bg-gradient-to-br from-[color:var(--color-primary)] via-[#7c74ff] to-[color:var(--color-secondary)] text-2xl font-semibold text-white shadow-[0_35px_90px_-35px_rgba(0,224,255,0.65)] transition-transform duration-200 group-hover:scale-110 group-active:scale-95">
                      <span className="pl-1">▶</span>
                      <span className="absolute inset-0 rounded-2xl border border-white/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                      <span className="absolute inset-[-14px] rounded-[26px] border border-white/10" />
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
