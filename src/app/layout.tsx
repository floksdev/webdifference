import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppProviders } from "@/components/layout/app-providers";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://webdifference.app"),
  title: {
    default: "Web Difference · Agence digitale différenciante",
    template: "%s · Web Difference",
  },
  description:
    "Studio produit & automation qui conçoit des expériences digitales sur-mesure, propulsées par l’IA et les workflows automatisés.",
  keywords: [
    "agence digitale",
    "automatisation",
    "Next.js",
    "SaaS",
    "design produit",
  ],
  openGraph: {
    title: "Web Difference",
    description:
      "Votre différence débute ici : devis instantané, automatisations no-code & expériences digitales haut de gamme.",
    type: "website",
    url: "https://webdifference.app",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppProviders>
      <html lang="fr">
        <body
          className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[color:var(--color-background-strong)] text-white antialiased`}
        >
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1 bg-[color:var(--color-background-strong)]">
              {children}
            </main>
            <NewsletterSection />
            <SiteFooter />
          </div>
        </body>
      </html>
    </AppProviders>
  );
}
