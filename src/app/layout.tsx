import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { AppProviders } from "@/components/layout/app-providers";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { MetaTheme } from "@/components/meta-theme";
import { PreconnectHints } from "@/components/preconnect-hints";
import { StructuredData } from "@/components/seo/structured-data";
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
  metadataBase: new URL("https://www.webdifference.fr"),
  title: {
    default: "Développeur Web & Agence Web - Créer un site web professionnel | Web Difference",
    template: "%s · Web Difference",
  },
  description:
    "Développeur web et agence web spécialisée dans la création de sites web professionnels. Création de sites web sur mesure, développement web, refonte de site. Devis gratuit et mise en ligne rapide. Paris, France.",
  keywords: [
    "développeur web",
    "développeur",
    "agence web",
    "créer un site web",
    "création site web",
    "développement web",
    "site web professionnel",
    "création de sites web",
    "développeur freelance",
    "agence web Paris",
    "développeur web Paris",
    "créer site internet",
    "refonte site web",
    "site web sur mesure",
    "développeur Next.js",
    "développeur React",
    "agence digitale",
    "web designer",
    "développeur frontend",
    "développeur backend",
    "sites web performants",
    "design web",
    "SEO",
    "automatisation",
  ],
  openGraph: {
    title: "Développeur Web & Agence Web - Créer un site web professionnel | Web Difference",
    description:
      "Développeur web et agence web spécialisée dans la création de sites web professionnels. Création de sites web sur mesure, développement web, refonte de site. Devis gratuit et mise en ligne rapide.",
    type: "website",
    url: "https://www.webdifference.fr",
    locale: "fr_FR",
    siteName: "Web Difference",
  },
  twitter: {
    card: "summary_large_image",
    title: "Développeur Web & Agence Web - Créer un site web professionnel",
    description: "Création de sites web professionnels sur mesure. Développeur web et agence web à Paris.",
  },
  alternates: {
    canonical: "https://www.webdifference.fr",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
  other: {
    "apple-mobile-web-app-title": "WebDifference",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-capable": "yes",
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
  // Important: aide Safari à choisir une UI cohérente
  colorScheme: "light dark",
  // Next supporte plusieurs theme colors via media queries
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#71DDAE" },
    { media: "(prefers-color-scheme: dark)", color: "#71DDAE" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppProviders>
      <html lang="fr" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} min-h-dvh text-foreground antialiased`}
        >
          {/* Préconnexions critiques injectées via script beforeInteractive */}
          <Script
            id="preconnect-hints"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  // Préconnexions
                  const preconnects = [
                    { href: 'https://calendly.com', crossorigin: false },
                    { href: 'https://fonts.googleapis.com', crossorigin: false },
                    { href: 'https://fonts.gstatic.com', crossorigin: true }
                  ];
                  const dnsPrefetches = [
                    'https://calendly.com',
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
                })();
              `,
            }}
          />
          {/* Preload du CSS critique pour éviter le blocage du rendu */}
          <Script
            id="preload-css"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
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
          <PreconnectHints />
          <MetaTheme />
          <StructuredData />
          <div className="flex min-h-dvh flex-col bg-(--color-background-strong)">
            <SiteHeader />
            <main className="flex-1 bg-(--color-background-strong)" style={{ paddingTop: 'calc(5rem + env(safe-area-inset-top))' }}>
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
