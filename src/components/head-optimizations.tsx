"use client";

import { useEffect } from "react";

export function HeadOptimizations() {
  useEffect(() => {
    // Préconnexions critiques - injectées dans le head pour être détectées par PageSpeed
    const preconnects = [
      { href: "https://calendly.com", crossorigin: false },
      { href: "https://assets.calendly.com", crossorigin: false },
      { href: "https://fonts.googleapis.com", crossorigin: false },
      { href: "https://fonts.gstatic.com", crossorigin: true },
    ];

    const dnsPrefetches = [
      "https://calendly.com",
      "https://assets.calendly.com",
      "https://fonts.googleapis.com",
      "https://fonts.gstatic.com",
    ];

    // Vérifier si les liens existent déjà
    const existingLinks = Array.from(
      document.head.querySelectorAll("link[rel='preconnect'], link[rel='dns-prefetch']")
    );
    const existingHrefs = new Set(
      existingLinks.map((link) => link.getAttribute("href"))
    );

    // Injecter les préconnexions au début du head pour priorité maximale
    preconnects.forEach(({ href, crossorigin }) => {
      if (!existingHrefs.has(href)) {
        const link = document.createElement("link");
        link.rel = "preconnect";
        link.href = href;
        if (crossorigin) {
          link.crossOrigin = "anonymous";
        }
        // Insérer au début du head pour priorité
        document.head.insertBefore(link, document.head.firstChild);
      }
    });

    // Injecter les DNS prefetch
    dnsPrefetches.forEach((href) => {
      if (!existingHrefs.has(href)) {
        const link = document.createElement("link");
        link.rel = "dns-prefetch";
        link.href = href;
        document.head.appendChild(link);
      }
    });

    // Preload du CSS critique - détecter et précharger immédiatement
    const preloadCriticalCSS = () => {
      const cssLinks = Array.from(
        document.head.querySelectorAll("link[rel='stylesheet']")
      );
      cssLinks.forEach((cssLink) => {
        const href = cssLink.getAttribute("href");
        if (href && !document.querySelector(`link[rel="preload"][href="${href}"]`)) {
          const preloadLink = document.createElement("link");
          preloadLink.rel = "preload";
          preloadLink.href = href;
          preloadLink.as = "style";
          // Insérer avant le stylesheet pour priorité
          document.head.insertBefore(preloadLink, cssLink);
        }
      });
    };

    // Exécuter immédiatement et observer les changements
    preloadCriticalCSS();

    const observer = new MutationObserver(() => {
      preloadCriticalCSS();
    });

    if (document.head) {
      observer.observe(document.head, {
        childList: true,
        subtree: false,
      });
    }

    return () => observer.disconnect();
  }, []);

  return null;
}

