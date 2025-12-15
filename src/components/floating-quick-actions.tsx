"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const quickReplies = [
  {
    href: "/contact",
    label: "Demander un devis express",
  },
  {
    href: "https://cal.com/",
    label: "Planifier un rendez-vous",
  },
  {
    href: "/contact",
    label: "Laisser un message détaillé",
  },
] as const;

export function FloatingQuickActions() {
  const [dismissed, setDismissed] = useState(false);
  const [open, setOpen] = useState(true);
  const [isBouncing, setIsBouncing] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsBouncing(true);
    }, 5200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isBouncing) return;

    const timeout = setTimeout(() => {
      setIsBouncing(false);
    }, 900);

    return () => clearTimeout(timeout);
  }, [isBouncing]);

  if (dismissed) return null;

  return (
    <aside className="fixed bottom-6 right-6 z-50 hidden w-[280px] flex-col gap-3 rounded-3xl border border-white/10 bg-[color:var(--color-surface)]/95 p-4 shadow-[0_18px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:flex">
      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="ml-auto text-xs text-white/45 transition hover:text-white/70"
        aria-label="Fermer le chat"
      >
        fermer
      </button>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-3 text-left"
        aria-expanded={open}
        aria-controls="floating-chat-panel"
      >
        <span className="relative">
          <span
            className={`relative inline-flex h-14 w-14 overflow-hidden rounded-full border border-white/20 bg-white/10 transition-transform ${
              isBouncing ? "animate-bounce" : ""
            }`}
          >
            <Image
              src="/test.jpg"
              alt="Portrait de Tristan"
              fill
              className="object-cover"
              sizes="56px"
              priority
            />
          </span>
          <span className="absolute -top-1 -right-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[color:var(--color-primary)] px-1 text-[10px] font-semibold text-white shadow-[0_6px_18px_rgba(59,130,246,0.45)]">
            1
          </span>
        </span>
        <span className="flex flex-1 flex-col">
          <span className="text-sm font-semibold text-white">Chat en direct</span>
          <span className="flex items-center gap-1 text-xs text-emerald-300">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-300" />
            En ligne · réponse en moins de 5&nbsp;min
          </span>
        </span>
        <span
          aria-hidden="true"
          className={`text-xs font-medium text-white/60 transition ${
            open ? "rotate-90" : ""
          }`}
        >
          →
        </span>
      </button>
      {open && (
        <div
          id="floating-chat-panel"
          className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-white/85 shadow-[0_14px_40px_rgba(15,118,255,0.2)] transition"
        >
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/45">
            Tristan · Web Difference
          </p>
          <div className="flex flex-col gap-2 text-sm text-white/75">
            <div className="max-w-[220px] rounded-2xl bg-white/10 px-4 py-3 text-white">
              Bonjour ! 👋 Je suis disponible pour avancer sur votre projet ou répondre à vos questions.
            </div>
            <div className="max-w-[220px] rounded-2xl bg-white/10 px-4 py-3 text-white">
              Choisissez l&apos;option qui vous convient ou laissez-moi un message rapide.
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {quickReplies.map((reply) => (
              <Link
                key={reply.href}
                href={reply.href}
                className="inline-flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                {reply.label}
                <span aria-hidden className="text-white/70">↗</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
