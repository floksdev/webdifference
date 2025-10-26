import Link from "next/link";

const footerLinks = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/confidentialite" },
  { label: "LinkedIn", href: "https://www.linkedin.com" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[color:var(--color-background-strong)] py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 text-sm text-white/70 md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} Web Difference. Construisons votre
          avantage digital durable.
        </p>
        <nav className="flex flex-wrap gap-4">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
