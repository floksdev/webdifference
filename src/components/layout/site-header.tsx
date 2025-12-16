"use client";

import {
  isAdminAuthenticated as checkAdminAuth,
  onAuthStateChange,
} from "@/lib/admin-auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/offres", label: "Nos offres" },
  { href: "/projets", label: "Nos projets" },
  { href: "/guides", label: "Guides" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isPhoneHovered, setIsPhoneHovered] = useState(false);

  const phoneNumber = "06 38 72 30 38";

  useEffect(() => {
    setIsAdminAuthenticated(checkAdminAuth());
    const unsubscribe = onAuthStateChange((authenticated) => {
      setIsAdminAuthenticated(authenticated);
    });
    return unsubscribe;
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-900/10 bg-[#71DDAE] backdrop-blur">
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/assets/main/fond-vert/logo-full.png"
            alt="Web Difference logo"
            width={160}
            height={65}
            className="h-auto w-[100px] md:w-[140px]"
            priority
          />
        </Link>
        <nav className="hidden items-center gap-6 text-base font-extrabold md:flex">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-[#1C1C1C] transition-all ${isActive ? "underline decoration-2 underline-offset-4 decoration-[#1C1C1C]" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
          {isAdminAuthenticated && (
            <Link
              href="/admin"
              className={`relative text-[#1C1C1C] transition-all ${pathname === "/admin" ? "underline decoration-2 underline-offset-4 decoration-[#1C1C1C]" : ""}`}
            >
              Admin
            </Link>
          )}
        </nav>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-slate-900/20 px-3 py-2 text-slate-700 transition hover:border-slate-900 hover:text-slate-900 md:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-label="Ouvrir la navigation"
          >
            {open ? "Fermer" : "Menu"}
          </button>
          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1C1C1C] px-5 text-xl font-extrabold tracking-wide text-white shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95"
              style={{
                height: "56px",
              }}
            >
              <FaCalendarAlt className="text-xl" color="#FFFFFF" />
              Prendre RDV
            </Link>
            <Link
              href="tel:+33638723038"
              className="group relative inline-flex items-center justify-center rounded-xl bg-[#1C1C1C] shadow-lg transition-all duration-300 overflow-hidden"
              style={{
                width: isPhoneHovered ? "200px" : "56px",
                height: "56px",
                gap: isPhoneHovered ? "0.5rem" : "0",
              }}
              aria-label="Appeler"
              onMouseEnter={() => setIsPhoneHovered(true)}
              onMouseLeave={() => setIsPhoneHovered(false)}
            >
              <FaPhone 
                className="text-2xl flex-shrink-0" 
                color="#FFFFFF"
              />
              <span 
                className="text-lg font-extrabold whitespace-nowrap flex items-center transition-all duration-300 ease-out" 
                style={{ 
                  color: "#FFFFFF",
                  opacity: isPhoneHovered ? 1 : 0,
                  transform: isPhoneHovered ? "translateX(0)" : "translateX(-10px)",
                  width: isPhoneHovered ? "auto" : "0",
                  overflow: "hidden",
                }}
              >
                {phoneNumber}
              </span>
            </Link>
          </div>
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
            {isAdminAuthenticated && (
              <Link
                href="/admin"
                className={`rounded-2xl border border-white/10 px-4 py-3 transition hover:border-[color:var(--color-secondary)] hover:text-white ${pathname === "/admin" ? "border-[color:var(--color-secondary)] text-white" : ""}`}
                onClick={() => setOpen(false)}
              >
                Admin
              </Link>
            )}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
