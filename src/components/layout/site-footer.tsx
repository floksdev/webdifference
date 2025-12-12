import Image from "next/image";
import Link from "next/link";
import { FaEnvelope, FaPhone } from "react-icons/fa";

const navigationLinks = [
  { label: "Accueil", href: "/" },
  { label: "L'Equipe de choc", href: "/equipe" },
  { label: "Nos Offres", href: "/offres" },
];

const legalLinks = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/confidentialite" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-900/10 bg-[#71DDAE] py-12">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
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
            <p className="text-sm text-[#1C1C1C]/80">
              Construisons votre avantage digital durable.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-[#1C1C1C]">Navigation</h3>
            <nav className="flex flex-col gap-3">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[#1C1C1C]/70 transition-colors hover:text-[#1C1C1C]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-[#1C1C1C]">Contact</h3>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:contact@webdifférence.fr"
                className="flex items-center gap-2 text-sm text-[#1C1C1C]/70 transition-colors hover:text-[#1C1C1C]"
              >
                <FaEnvelope className="text-[#1C1C1C]" />
                contact@webdifférence.fr
              </a>
              <a
                href="tel:+33638723038"
                className="flex items-center gap-2 text-sm text-[#1C1C1C]/70 transition-colors hover:text-[#1C1C1C]"
              >
                <FaPhone className="text-[#1C1C1C]" />
                06 38 72 30 38
              </a>
            </div>
          </div>

          {/* Mentions légales */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-[#1C1C1C]">Légal</h3>
            <nav className="flex flex-col gap-3">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[#1C1C1C]/70 transition-colors hover:text-[#1C1C1C]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-slate-900/10 pt-8 text-center">
          <p className="text-sm text-[#1C1C1C]/60">
            © {new Date().getFullYear()} Web Difference. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
