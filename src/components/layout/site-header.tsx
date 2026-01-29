"use client";

import {
  isAdminAuthenticated as checkAdminAuth,
  onAuthStateChange,
} from "@/lib/admin-auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaCalendarAlt } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { GlassBar } from "./glass-bar";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/offres", label: "Offres" },
  { href: "/projets", label: "Projets" },
  { href: "/guides", label: "Guides" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
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

  // Fermer le menu quand on change de page
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Bloquer le scroll du body quand le menu est ouvert
  useEffect(() => {
    if (menuOpen) {
      // Sauvegarder la position de scroll
      const scrollY = window.scrollY;
      
      // Bloquer le scroll de manière simple
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
      
      return () => {
        // Restaurer le scroll
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.width = '';
        // Restaurer la position de scroll
        window.scrollTo(0, scrollY);
      };
    }
  }, [menuOpen]);

  return (
    <GlassBar position="top" className="w-full">
      <header className="mx-auto relative flex h-20 w-full max-w-6xl items-center justify-center md:justify-between px-6">
        {/* Bouton menu mobile */}
        <button
          type="button"
          aria-label="Ouvrir le menu"
          aria-expanded={menuOpen}
          className="absolute left-6 flex h-10 w-10 items-center justify-center rounded-full text-[#1C1C1C] transition hover:bg-[#1C1C1C]/10 focus:outline-none focus:ring-2 focus:ring-[#1C1C1C]/20 md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className="relative h-4 w-5">
            <span
              className={`absolute left-0 h-0.5 w-full rounded-full bg-current transition-all duration-300 ${
                menuOpen ? "top-1/2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 h-0.5 w-full rounded-full bg-current transition-all duration-300 ${
                menuOpen ? "opacity-0" : "-translate-y-1/2"
              }`}
            />
            <span
              className={`absolute left-0 h-0.5 w-full rounded-full bg-current transition-all duration-300 ${
                menuOpen ? "top-1/2 -rotate-45" : "bottom-0"
              }`}
            />
          </span>
        </button>

        {/* Logo */}
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

        {/* Bouton RDV mobile - juste l'icône */}
        <a
          href="https://calendly.com/webdifference/nouvelle-reunion?hide_gdpr_banner=1&background_color=282828&text_color=ffffff&primary_color=71ddae&month=2025-12"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Prendre rendez-vous"
          className="absolute right-6 md:hidden inline-flex items-center justify-center rounded-xl bg-[#1C1C1C] h-12 w-12 shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95"
          suppressHydrationWarning
        >
          <FaCalendarAlt className="text-xl" color="#FFFFFF" aria-hidden="true" />
        </a>

        {/* Navigation desktop */}
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

        {/* Boutons CTA desktop */}
        <div className="hidden items-center gap-2 md:flex">
          <a
            href="https://calendly.com/webdifference/nouvelle-reunion?hide_gdpr_banner=1&background_color=282828&text_color=ffffff&primary_color=71ddae&month=2025-12"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1C1C1C] px-5 text-xl font-extrabold tracking-wide text-white shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95"
            style={{
              height: "56px",
            }}
            suppressHydrationWarning
          >
            <FaCalendarAlt className="text-xl" color="#FFFFFF" />
            Prendre RDV
          </a>
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
      </header>

      {/* Menu mobile dropdown - Fullscreen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 safe-top safe-bottom bg-[#71DDAE] z-[9999] md:hidden flex flex-col"
            style={{ 
              height: '100dvh',
            }}
          >
            {/* Header dans le menu - Fixe en haut */}
            <div className="flex items-center justify-between px-6 py-4 h-20 border-b border-[#1C1C1C]/10 bg-[#71DDAE] shrink-0">
              <Link href="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
                <Image
                  src="/assets/main/fond-vert/logo-full.png"
                  alt="Web Difference logo"
                  width={160}
                  height={65}
                  className="h-auto w-[100px]"
                  priority
                />
              </Link>
              <button
                type="button"
                aria-label="Fermer le menu"
                onClick={() => setMenuOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-[#1C1C1C] transition hover:bg-[#1C1C1C]/10"
              >
                <span className="relative h-4 w-5">
                  <span className="absolute left-0 top-1/2 h-0.5 w-full rounded-full bg-current rotate-45" />
                  <span className="absolute left-0 top-1/2 h-0.5 w-full rounded-full bg-current -rotate-45" />
                </span>
              </button>
            </div>
            
            {/* Contenu scrollable */}
            <div className="flex-1 flex flex-col min-h-0 overflow-hidden px-6">
              <nav className="flex flex-col gap-2 flex-1 overflow-y-auto py-4 mb-10 overscroll-contain" style={{ WebkitOverflowScrolling: 'touch' }}>
                {links.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`rounded-lg px-4 py-3 text-base font-semibold transition-all ${
                        isActive
                          ? "bg-[#1C1C1C] text-white shadow-sm"
                          : "text-[#1C1C1C] hover:bg-[#1C1C1C]/10"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                {isAdminAuthenticated && (
                  <Link
                    href="/admin"
                    onClick={() => setMenuOpen(false)}
                    className={`rounded-lg px-4 py-3 text-base font-semibold transition-all ${
                      pathname === "/admin"
                        ? "bg-[#1C1C1C] text-white shadow-sm"
                        : "text-[#1C1C1C] hover:bg-[#1C1C1C]/10"
                    }`}
                  >
                    Admin
                  </Link>
                )}
              </nav>
              
              {/* Boutons CTA en bas */}
              <div className="pt-2 border-t border-[#1C1C1C]/10 flex flex-col gap-3 pb-12 shrink-0" style={{ paddingBottom: 'max(3rem, calc(env(safe-area-inset-bottom) + 1.5rem))' }}>
                <a
                  href="https://calendly.com/webdifference/nouvelle-reunion?hide_gdpr_banner=1&background_color=282828&text_color=ffffff&primary_color=71ddae&month=2025-12"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1C1C1C] px-4 py-3 text-base font-extrabold text-white shadow-lg transition-transform duration-200 hover:scale-[1.02] active:scale-95"
                  suppressHydrationWarning
                >
                  <FaCalendarAlt className="text-lg" />
                  Prendre RDV
                </a>
                <Link
                  href="tel:+33638723038"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#1C1C1C] bg-transparent px-4 py-3 text-base font-extrabold text-[#1C1C1C] transition-all hover:bg-[#1C1C1C] hover:text-white"
                >
                  <FaPhone className="text-lg" />
                  {phoneNumber}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassBar>
  );
}
