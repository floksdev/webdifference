"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/devis", label: "Devis" },
  { href: "/portfolio", label: "Réalisations" },
  { href: "/automatisations", label: "Automatisations" },
  { href: "/a-propos", label: "À propos" },
  { href: "/offres", label: "Offres" },
  { href: "/blog", label: "Ressources" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[color:rgba(44,62,80,0.85)] backdrop-blur">
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/assets/main/logo-full.png"
            alt="Web Difference logo"
            width={160}
            height={65}
            className="h-auto w-[120px] md:w-[160px]"
            priority
          />
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors hover:text-white ${isActive ? "text-white" : "text-white/70"}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-3 py-2 text-white/80 transition hover:border-[color:var(--color-secondary)] hover:text-white md:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-label="Ouvrir la navigation"
          >
            {open ? "Fermer" : "Menu"}
          </button>
          <Link
            href="/contact"
            className="rounded-full bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-secondary)] px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-[rgba(108,99,255,0.35)] transition hover:shadow-[rgba(0,224,255,0.35)]"
          >
            Parler à Tristan
          </Link>
        </div>
      </div>
      {open ? (
        <div className="border-t border-white/10 bg-[color:var(--color-background-strong)]/95 px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-3 text-sm font-medium text-white/80">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-2xl border border-white/10 px-4 py-3 transition hover:border-[color:var(--color-secondary)] hover:text-white ${isActive ? "border-[color:var(--color-secondary)] text-white" : ""}`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
