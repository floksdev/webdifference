"use client";

import { useEffect } from "react";

export function PreconnectHints() {
  useEffect(() => {
    // Préconnexions critiques pour améliorer les performances
    // Ce composant s'exécute côté client pour garantir que les liens sont injectés
    const preconnects = [
      { href: "https://calendly.com", crossorigin: false },
      { href: "https://fonts.googleapis.com", crossorigin: false },
      { href: "https://fonts.gstatic.com", crossorigin: true },
    ];

    const dnsPrefetches = [
      "https://calendly.com",
      "https://fonts.googleapis.com",
      "https://fonts.gstatic.com",
    ];

    // Vérifier si les liens existent déjà avant de les ajouter
    const existingLinks = Array.from(document.head.querySelectorAll("link[rel='preconnect'], link[rel='dns-prefetch'], link[rel='preload']"));
    const existingHrefs = new Set(existingLinks.map((link) => link.getAttribute("href")));

    // Ajouter les préconnexions
    preconnects.forEach(({ href, crossorigin }) => {
      if (!existingHrefs.has(href)) {
        const link = document.createElement("link");
        link.rel = "preconnect";
        link.href = href;
        if (crossorigin) {
          link.crossOrigin = "anonymous";
        }
        document.head.appendChild(link);
      }
    });

    // Ajouter les DNS prefetch
    dnsPrefetches.forEach((href) => {
      if (!existingHrefs.has(href)) {
        const link = document.createElement("link");
        link.rel = "dns-prefetch";
        link.href = href;
        document.head.appendChild(link);
      }
    });

    // Précharger le CSS critique si disponible
    // Next.js génère le CSS avec un hash, on essaie de le trouver
    const cssLinks = Array.from(document.head.querySelectorAll("link[rel='stylesheet']"));
    cssLinks.forEach((cssLink) => {
      const href = cssLink.getAttribute("href");
      if (href && !existingHrefs.has(href)) {
        // Créer un preload pour le CSS critique
        const preloadLink = document.createElement("link");
        preloadLink.rel = "preload";
        preloadLink.href = href;
        preloadLink.as = "style";
        // Insérer avant le link stylesheet pour prioriser le chargement
        document.head.insertBefore(preloadLink, cssLink);
      }
    });
  }, []);

  return null;
}

