"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaCalendarAlt, FaEnvelope } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/offres", label: "Offres" },
  { href: "/projets", label: "Projets" },
  { href: "/guides", label: "Guides" },
];

const legalLinks = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/politique-de-confidentialite" },
  { label: "Conditions générales de vente (CGV)", href: "/cgv" },
  { label: "Conditions générales d'utilisation (CGU)", href: "/cgu" },
];

export function SiteFooter() {
  const pathname = usePathname();

  return (
    <footer className="border-t border-slate-900/10 bg-[#71DDAE] py-12">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo et description */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/assets/main/fond-vert/logo-full.png"
                alt="Web Difference logo"
                width={160}
                height={65}
                className="h-auto w-[120px] md:w-[140px]"
              />
            </Link>
            <p className="text-sm text-[#1C1C1C]">
              Des sites web qui donnent envie de rester
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <h3 className="text-base font-extrabold text-[#1C1C1C]">Navigation</h3>
            <nav className="flex flex-col gap-2">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                <Link
                  key={link.href}
                  href={link.href}
                    className={`text-sm text-[#1C1C1C] transition-all ${isActive ? "underline decoration-2 underline-offset-4 decoration-[#1C1C1C]" : "hover:underline decoration-2 underline-offset-4"}`}
                >
                  {link.label}
                </Link>
                );
              })}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-2">
            <h3 className="text-base font-extrabold text-[#1C1C1C]">Contact</h3>
            <div className="flex flex-col gap-1">
              <Link
                href="https://calendly.com/webdifference/nouvelle-reunion?hide_gdpr_banner=1&background_color=282828&text_color=ffffff&primary_color=71ddae&month=2025-12"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[#1C1C1C] transition-all hover:underline decoration-2 underline-offset-4"
              >
                <FaCalendarAlt className="text-[#1C1C1C]/75" />
                Prendre RDV
              </Link>
              <a
                href="tel:+33638723038"
                className="flex items-center gap-2 text-sm text-[#1C1C1C] transition-all hover:underline decoration-2 underline-offset-4"
              >
                <FaPhone className="text-[#1C1C1C]/75" />
                06 38 72 30 38
              </a>
              <a
                href="mailto:contact@webdifférence.fr"
                className="flex items-center gap-2 text-sm text-[#1C1C1C] transition-all hover:underline decoration-2 underline-offset-4"
              >
                <FaEnvelope className="text-[#1C1C1C]/75" />
                contact@webdifférence.fr
              </a>
            </div>
          </div>

          {/* Mentions légales */}
          <div className="space-y-2">
            <h3 className="text-base font-extrabold text-[#1C1C1C]">Légal</h3>
            <nav className="flex flex-col gap-2">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[#1C1C1C] transition-all hover:underline decoration-2 underline-offset-4 leading-tight flex items-center"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-slate-900/10 pt-8 text-center">
          <p className="text-sm text-[#1C1C1C]">
            © {new Date().getFullYear()} Web Difference. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
