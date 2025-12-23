import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { AppProviders } from "@/components/layout/app-providers";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { MetaTheme } from "@/components/meta-theme";
import { PreconnectHints } from "@/components/preconnect-hints";
import "./globals.css";

// Optimisation des polices pour LCP : preload et display swap
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Affiche le texte immédiatement avec une police de secours
  preload: true, // Précharge la police pour améliorer le LCP
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://webdifference.app"),
  title: {
    default: "Web Difference · Agence digitale différenciante",
    template: "%s · Web Difference",
  },
  description:
    "Studio produit & automation qui conçoit des expériences digitales sur-mesure, propulsées par l'IA et les workflows automatisés.",
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
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  // Important: aide Safari à choisir une UI cohérente
  colorScheme: "light dark",
  // Next supporte plusieurs theme colors via media queries
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#71DDAE" },
    { media: "(prefers-color-scheme: dark)", color: "#71DDAE" },
  ],
  other: {
    "apple-mobile-web-app-title": "WebDifference",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-capable": "yes",
    "theme-color": "#71DDAE",
    "permissions-policy": "payment=(self)",
  },
  // Préconnexions pour améliorer les performances
  // Note: Next.js n'a pas de support direct pour preconnect dans metadata,
  // donc on utilise un script beforeInteractive en complément
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  // maximumScale: retiré pour permettre le zoom jusqu'à 5x (requis pour l'accessibilité)
  // Les utilisateurs malvoyants doivent pouvoir zoomer jusqu'à 5x minimum
  // Pour iOS : permet d'utiliser toute la surface écran + safe areas
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppProviders>
      <html lang="fr" suppressHydrationWarning>
        {/* Préconnexions et optimisation CSS critiques pour améliorer les performances */}
        <Script
          id="preconnect-hints"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Préconnexions
                const preconnects = [
                  { href: 'https://calendly.com', crossorigin: false },
                  { href: 'https://assets.calendly.com', crossorigin: false },
                  { href: 'https://fonts.googleapis.com', crossorigin: false },
                  { href: 'https://fonts.gstatic.com', crossorigin: true }
                ];
                const dnsPrefetches = [
                  'https://calendly.com',
                  'https://assets.calendly.com',
                  'https://fonts.googleapis.com',
                  'https://fonts.gstatic.com'
                ];
                preconnects.forEach(({ href, crossorigin }) => {
                  const link = document.createElement('link');
                  link.rel = 'preconnect';
                  link.href = href;
                  if (crossorigin) link.crossOrigin = 'anonymous';
                  document.head.appendChild(link);
                });
                dnsPrefetches.forEach((href) => {
                  const link = document.createElement('link');
                  link.rel = 'dns-prefetch';
                  link.href = href;
                  document.head.appendChild(link);
                });
                
                // Observer pour précharger le CSS dès qu'il apparaît dans le head
                const observer = new MutationObserver(function(mutations) {
                  mutations.forEach(function(mutation) {
                    mutation.addedNodes.forEach(function(node) {
                      if (node.nodeName === 'LINK' && node.rel === 'stylesheet') {
                        const href = node.getAttribute('href');
                        if (href && !document.querySelector('link[rel="preload"][href="' + href + '"]')) {
                          const preloadLink = document.createElement('link');
                          preloadLink.rel = 'preload';
                          preloadLink.href = href;
                          preloadLink.as = 'style';
                          document.head.insertBefore(preloadLink, node);
                        }
                      }
                    });
                  });
                });
                
                // Observer les changements dans le head
                if (document.head) {
                  observer.observe(document.head, { childList: true, subtree: false });
                } else {
                  document.addEventListener('DOMContentLoaded', function() {
                    observer.observe(document.head, { childList: true, subtree: false });
                  });
                }
              })();
            `,
          }}
        />
        <body
          className={`${geistSans.variable} ${geistMono.variable} min-h-dvh text-foreground antialiased`}
        >
          <PreconnectHints />
          <MetaTheme />
          <div className="flex min-h-dvh flex-col bg-[color:var(--color-background-strong)]">
            <SiteHeader />
            <main className="flex-1 bg-[color:var(--color-background-strong)]" style={{ paddingTop: 'calc(5rem + env(safe-area-inset-top))' }}>
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
