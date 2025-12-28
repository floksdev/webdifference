"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function ProjectCalloutSection() {
  const [open, setOpen] = useState(false);

  const actions = [
    {
      key: "call",
      label: "Appeler Tristan",
      description: "Un échange direct pour clarifier vos besoins.",
      href: "tel:+33600000000",
      Icon: PhoneIcon,
    },
    {
      key: "meet",
      label: "Prendre rendez-vous",
      description: "Planifiez un créneau visio ou physique en quelques secondes.",
      href: "https://calendly.com/webdifference/nouvelle-reunion?hide_gdpr_banner=1&background_color=282828&text_color=ffffff&primary_color=71ddae&month=2025-12",
      Icon: CalendarIcon,
    },
    {
      key: "form",
      label: "Remplir le formulaire",
      description: "Décrivez votre projet en détail, je reviens vers vous rapidement.",
      href: "/contact",
      Icon: ChatIcon,
    },
  ] as const;

  return (
    <section className="pt-6 pb-16">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 text-center md:px-8">
        <div className="w-full rounded-[32px] border border-white/10 bg-white/5 px-10 py-14 shadow-[0_40px_120px_-60px_rgba(37,99,235,0.65)] backdrop-blur-2xl md:px-16">
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Envie de discuter de votre projet ?
          </h2>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="mt-10 inline-flex items-center gap-5 rounded-full bg-[color:var(--color-primary)] pl-4 pr-12 py-5 text-white shadow-[0_30px_80px_-50px_rgba(59,130,246,0.75)] transition-transform duration-200 hover:scale-[1.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
          >
            <span className="relative h-14 w-14 overflow-hidden rounded-full border border-white/20 bg-white/10">
              <Image
                src="/test.jpg"
                alt="Portrait de Tristan"
                fill
                className="object-cover"
                sizes="56px"
                priority
              />
            </span>
            <span className="flex items-center gap-4">
              <span className="text-2xl font-semibold leading-none">Contacter Tristan</span>
              <span aria-hidden className="text-2xl font-bold leading-none text-white/90">
                →
              </span>
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-slate-900/70 p-8 text-left shadow-[0_60px_160px_-80px_rgba(15,118,255,0.65)] backdrop-blur-2xl"
              initial={{ opacity: 0, scale: 0.9, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 12 }}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute right-6 top-6 text-slate-300 transition hover:text-white"
                aria-label="Fermer la fenêtre de contact"
              >
                ×
              </button>

              <h3 className="text-2xl font-semibold text-white">Choisissez votre canal</h3>
              <p className="mt-2 text-sm text-slate-300">
                Je vous réponds personnellement, quel que soit le format choisi.
              </p>

              <ul className="mt-6 space-y-4">
                {actions.map(({ key, label, description, href, Icon }) => (
                  <li key={key}>
                    <a
                      href={href}
                      className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 transition duration-200 hover:border-white/20 hover:bg-white/10"
                    >
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20 text-blue-200 group-hover:bg-blue-500/25">
                        <Icon className="h-6 w-6" />
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-white">{label}</p>
                        <p className="text-xs text-slate-300">{description}</p>
                      </div>
                      <span className="text-xs font-medium text-slate-300 transition group-hover:text-white">
                        Ouvrir →
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

type IconProps = {
  className?: string;
};

function PhoneIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M3.654 3.2A2.25 2.25 0 0 1 5.814 2h2.372c.966 0 1.8.66 2.023 1.604l.488 2.061a2.25 2.25 0 0 1-.57 2.092l-1.148 1.147a.75.75 0 0 0-.132.855 8.27 8.27 0 0 0 4.008 4.007.75.75 0 0 0 .855-.132l1.147-1.147a2.25 2.25 0 0 1 2.093-.57l2.06.488A2.25 2.25 0 0 1 22 18.815v2.371a2.25 2.25 0 0 1-1.199 1.96c-.342.18-.72.27-1.102.27A17.25 17.25 0 0 1 2 5.955c0-.383.09-.76.27-1.102Z" />
    </svg>
  );
}

function CalendarIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 3v2.25M17.25 3v2.25M3 9h18M5.25 5.25h13.5A1.5 1.5 0 0 1 20.25 6.75v11.5a1.5 1.5 0 0 1-1.5 1.5h-13.5a1.5 1.5 0 0 1-1.5-1.5V6.75a1.5 1.5 0 0 1 1.5-1.5Z"
      />
    </svg>
  );
}

function ChatIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.5 8.25h9m-9 3h5.25m-2.625 7.5 4.5 3v-3h4.5a1.5 1.5 0 0 0 1.5-1.5V6.75a1.5 1.5 0 0 0-1.5-1.5h-13.5a1.5 1.5 0 0 0-1.5 1.5v10.5a1.5 1.5 0 0 0 1.5 1.5h2.625Z"
      />
    </svg>
  );
}
