import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Content Security Policy (CSP) stricte pour protéger contre les attaques XSS
  const cspHeader = [
    // Default: refuser tout par défaut
    "default-src 'self'",
    
    // Scripts: autoriser uniquement les scripts de confiance
    // 'unsafe-eval' nécessaire pour Next.js en développement et certains scripts
    // 'unsafe-inline' nécessaire pour les scripts inline générés par Next.js
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://assets.calendly.com https://*.calendly.com",
    
    // Styles: autoriser les styles inline (nécessaire pour Tailwind et styles dynamiques)
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    
    // Images: autoriser les images depuis différentes sources
    "img-src 'self' data: https: blob:",
    
    // Fonts: autoriser les fonts Google
    "font-src 'self' https://fonts.gstatic.com data:",
    
    // Connect: autoriser les connexions vers Calendly, Supabase, Clerk, les APIs et WebSockets
    "connect-src 'self' https://*.calendly.com https://calendly.com https://assets.calendly.com https://*.supabase.co https://*.supabase.in https://*.clerk.accounts.dev https://*.clerk.com wss://*.calendly.com ws://localhost:* wss://localhost:*",
    
    // Frame: autoriser les iframes Calendly et Clerk uniquement
    "frame-src 'self' https://*.calendly.com https://calendly.com https://*.clerk.accounts.dev https://*.clerk.com",
    
    // Frame ancestors: empêcher l'embedding dans d'autres sites (protection clickjacking)
    // 'self' permet l'embedding uniquement depuis le même domaine
    // Pour une protection maximale, utilisez 'none' (mais cela empêche aussi l'embedding depuis votre propre domaine)
    "frame-ancestors 'self'",
    
    // Object: désactiver les plugins
    "object-src 'none'",
    
    // Base URI: limiter les base URI
    "base-uri 'self'",
    
    // Form action: limiter où les formulaires peuvent être soumis
    "form-action 'self'",
    
    // Upgrade insecure requests: forcer HTTPS
    "upgrade-insecure-requests",
    
    // Trusted Types: atténuer les attaques XSS basées sur le DOM
    // 'script' : contrôle les données transmises aux fonctions de récepteur XSS basées sur le DOM
    // Cela protège contre les attaques XSS via innerHTML, eval(), Function(), etc.
    // Note: React gère dangerouslySetInnerHTML de manière sécurisée, mais Trusted Types ajoute une couche supplémentaire
    "require-trusted-types-for 'script'",
    
    // Report URI: optionnel, pour recevoir les rapports de violation (décommentez si vous avez un endpoint)
    // "report-uri /api/csp-report",
  ].join("; ");

  // Headers de sécurité supplémentaires
  response.headers.set("Content-Security-Policy", cspHeader);
  
  // HSTS (HTTP Strict Transport Security): forcer HTTPS et protéger contre les attaques de rétrogradation
  // max-age: 31536000 = 1 an (recommandé pour la production)
  // includeSubDomains: applique HSTS à tous les sous-domaines
  // preload: permet d'être inclus dans la liste de préchargement HSTS des navigateurs
  // Note: Pour utiliser preload, vous devez soumettre votre domaine à https://hstspreload.org/
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload"
  );
  
  // X-Frame-Options: protection contre le clickjacking (compatibilité avec les anciens navigateurs)
  // SAMEORIGIN: permet l'embedding uniquement depuis le même domaine
  // DENY: bloque complètement l'embedding (plus strict, mais peut casser certaines intégrations)
  // Note: Si frame-ancestors est présent dans la CSP, il prend priorité sur X-Frame-Options
  // On garde les deux pour la compatibilité maximale
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  
  // X-Content-Type-Options: empêcher le MIME type sniffing
  response.headers.set("X-Content-Type-Options", "nosniff");
  
  // Referrer-Policy: contrôler les informations de referrer
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  
  // COOP (Cross-Origin-Opener-Policy): isoler la fenêtre de premier niveau des autres documents
  // "same-origin": isole complètement la fenêtre, empêche les pop-ups d'accéder à window.opener
  // Cela protège contre les attaques comme Spectre et les fuites d'informations cross-origin
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  
  // COEP (Cross-Origin-Embedder-Policy): complément de COOP pour une isolation complète
  // "require-corp": exige que toutes les ressources cross-origin utilisent CORS ou CORP
  // Note: Peut casser certaines intégrations tierces, à utiliser avec précaution
  // response.headers.set("Cross-Origin-Embedder-Policy", "require-corp");
  
  // CORP (Cross-Origin-Resource-Policy): contrôle qui peut charger vos ressources
  // "same-origin": seules les requêtes de la même origine peuvent charger la ressource
  response.headers.set("Cross-Origin-Resource-Policy", "same-origin");
  
  // Permissions-Policy: contrôler les fonctionnalités du navigateur
  response.headers.set(
    "Permissions-Policy",
    "geolocation=(), microphone=(), camera=(), payment=(self), storage-access=(self)"
  );

  return response;
}

// Appliquer le middleware à toutes les routes sauf les assets statiques
// Le middleware doit s'appliquer à toutes les pages HTML pour que les headers de sécurité soient présents
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt, sitemap.xml (SEO files)
     * - *.png, *.jpg, *.jpeg, *.gif, *.svg, *.ico, *.webp (image files)
     * 
     * Note: On inclut les routes API pour que les headers soient aussi présents sur les réponses API
     * Cela garantit que PageSpeed détecte bien les headers sur toutes les pages
     */
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg|.*\\.ico|.*\\.webp).*)",
  ],
};

