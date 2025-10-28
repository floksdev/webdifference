"use client";

import Image from "next/image";
import { useState } from "react";

type Message = {
  id: string;
  author: "client" | "tristan";
  text: string;
  timestamp: string;
  read?: boolean;
  cta?: boolean;
};

const messages: Message[] = [
  {
    id: "client-question",
    author: "client",
    text: "Mais Tristan, je comprends toujours pas… qu’est-ce qui fait vraiment la différence ?",
    timestamp: "09:21",
  },
  {
    id: "tristan-answer",
    author: "tristan",
    text: "Aucun souci, c’est normal ! Je m’engage à tout vous rendre simple : suivi en temps réel, visibilité claire à chaque étape, livraison rapide garantie.",
    timestamp: "09:22",
    read: true,
  },
  {
    id: "tristan-cta",
    author: "tristan",
    text: "Envie de voir comment ça fonctionne concrètement ? Regardez la vidéo démo.",
    timestamp: "09:24",
    read: true,
    cta: true,
  },
];

function DoubleCheckIcon({ highlighted }: { highlighted: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-3 w-3 ${highlighted ? "fill-[#34B7F1]" : "fill-[#8E9DA6]"}`}
      aria-hidden="true"
    >
      <path d="M1.6 12.8 0 11.2l4.8-4.8 3.2 3.2L11.2 6l1.6 1.6-4.8 4.8-3.2-3.2ZM9.6 12.8 8 11.2l4.8-4.8 3.2 3.2L19.2 6l1.6 1.6-4.8 4.8-3.2-3.2Z" />
    </svg>
  );
}

export function ConversationSection() {
  const [open, setOpen] = useState(false);

  return (
    <section className="border-t border-white/10 py-12">
      <div className="mx-auto flex max-w-4xl flex-col gap-8 px-6">
        <div className="relative overflow-hidden rounded-[36px] shadow-[0_35px_80px_rgba(0,0,0,0.35)]">
          <Image
            src="/whatsapp-wallpaper2.jpg"
            alt="Fond de conversation WhatsApp"
            fill
            priority
            className="pointer-events-none -z-20 object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(44,62,80,0.35),_rgba(44,62,80,0.68))]" />
          <div className="absolute inset-0 -z-5 bg-[linear-gradient(200deg,rgba(12,22,33,0.12),rgba(12,22,33,0.55))]" />
          <div className="relative flex flex-col gap-2 px-6 py-8">
            {messages.map((message) => {
              const isTristan = message.author === "tristan";
              return (
                <div
                  key={message.id}
                  className={`flex items-end gap-2 ${isTristan ? "justify-end" : "justify-start"}`}
                >
                  {!isTristan ? (
                    <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-white/90 text-xs font-semibold text-[#0B141A]/70">
                      C
                    </span>
                  ) : null}

                  <div className="relative flex max-w-[78%] flex-col gap-2">
                    <div
                      className={`relative rounded-[16px] px-4 py-2 text-sm leading-relaxed shadow-[0_1px_2px_rgba(0,0,0,0.1)] ${
                        isTristan ? "bg-[#DCF8C6] text-[#0B141A]" : "bg-[#F0F0F0] text-[#222222]"
                      }`}
                    >
                      <p>{message.text}</p>
                      <div className="mt-1 flex items-center justify-end gap-1 text-[11px] text-[#6B7681]">
                        <span>{message.timestamp}</span>
                        {isTristan ? (
                          <span className="wa-checks" title="Vu">
                            <DoubleCheckIcon highlighted={Boolean(message.read)} />
                          </span>
                        ) : null}
                      </div>
                      <span
                        className={`absolute bottom-1 h-3 w-3 ${
                          isTristan ? "right-[-6px]" : "left-[-6px]"
                        }`}
                        style={{ backgroundColor: isTristan ? "#DCF8C6" : "#F0F0F0" }}
                        aria-hidden="true"
                      />
                    </div>

                    {message.cta ? (
                      <button
                        type="button"
                        onClick={() => setOpen(true)}
                        className="ml-auto inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-secondary)] px-5 py-2 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(0,224,255,0.25)] transition hover:shadow-[0_15px_35px_rgba(0,224,255,0.32)]"
                      >
                        Lancer la démo vidéo
                      </button>
                    ) : null}
                  </div>

                  {isTristan ? (
                    <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-secondary)] text-xs font-semibold text-white">
                      T
                    </span>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 px-4 py-6">
          <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-[rgba(12,22,33,0.92)] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 h-10 w-10 rounded-full border border-white/20 text-sm font-semibold text-white/80 transition hover:border-[color:var(--color-secondary)] hover:text-white"
              aria-label="Fermer la vidéo"
            >
              ✕
            </button>
            <div className="aspect-video w-full overflow-hidden rounded-2xl border border-white/15 bg-black">
              <iframe
                title="Démonstration accompagnement Web Difference"
                src="https://www.youtube.com/embed/_nBlN9yp9R8"
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="mt-4 text-sm text-white/70">
              Vidéo démo : onboarding client, suivi en temps réel et automatisations en action.
            </p>
          </div>
        </div>
      ) : null}
    </section>
  );
}
