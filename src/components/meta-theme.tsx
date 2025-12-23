"use client";

import { useEffect } from "react";

export function MetaTheme() {
  useEffect(() => {
    // Fonction pour créer ou mettre à jour un meta tag
    const setMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    // Les deux barres (haut et bas) : TOUJOURS vertes
    
    // Status bar (barre du haut) : toujours verte
    setMetaTag("theme-color", "#71DDAE");
    
    // Navigation bar (barre du bas) : toujours verte via background-color du body
    document.body.style.backgroundColor = "#71DDAE";
    
    // Pour la Navigation Bar (barre du haut iOS) - fonctionne seulement en mode PWA
    setMetaTag("apple-mobile-web-app-status-bar-style", "black-translucent");
    setMetaTag("apple-mobile-web-app-capable", "yes");
    
    // Meta tags supplémentaires pour meilleure compatibilité
    setMetaTag("mobile-web-app-capable", "yes");
    setMetaTag("msapplication-navbutton-color", "#71DDAE");
    setMetaTag("msapplication-TileColor", "#71DDAE");
    
    // Permissions policy pour éviter les violations
    const setHttpEquivTag = (equiv: string, content: string) => {
      let meta = document.querySelector(`meta[http-equiv="${equiv}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("http-equiv", equiv);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };
    setHttpEquivTag("Permissions-Policy", "payment=(self)");
    
    // Fonction pour s'assurer que les deux barres restent toujours vertes
    const ensureBarsGreen = () => {
      // Status bar
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) {
        meta.setAttribute("content", "#71DDAE");
      }
      
      // Navigation bar
      document.body.style.backgroundColor = "#71DDAE";
    };
    
    // Vérifier périodiquement que les barres restent vertes
    const barsInterval = setInterval(ensureBarsGreen, 2000);
    
    // Vérifier au scroll (la nav bar se met à jour au scroll selon l'article)
    window.addEventListener('scroll', ensureBarsGreen, { passive: true });
    
    // Initialiser
    ensureBarsGreen();
    
    // Nettoyage
    return () => {
      window.removeEventListener('scroll', ensureBarsGreen);
      clearInterval(barsInterval);
    };
  }, []);

  return null;
}
