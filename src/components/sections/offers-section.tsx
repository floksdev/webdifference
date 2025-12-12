"use client";

import { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaCalendarAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";

type Offer = {
  id: string;
  name: string;
  tagline: string;
  price: string;
  description: string;
  items: string[];
  badge: string;
  accent: string;
  icon: ReactNode;
  ctaHint: string;
};

const offers: Offer[] = [
  {
    id: "offres-site-vitrine",
    name: "Site vitrine",
    tagline: "Idéal artisans & TPE",
    price: "À partir de 2 900 €",
    description:
      "Valorisez votre activité, attirez plus de demandes et rassurez vos prospects dès la première visite.",
    badge: "Mise en ligne < 4 semaines",
    items: [
      "Structure claire : accueil, services, avis, contact",
      "SEO local optimisé et formulaires connectés",
      "Formation vidéo pour être autonome",
    ],
    accent: "from-emerald-400/35 via-indigo-500/25 to-purple-500/25",
    icon: (
      <svg
        viewBox="0 0 32 32"
        className="h-10 w-10 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="4.2" y="6.2" width="23.6" height="18.6" rx="2.8" />
        <path d="M4.2 12.8h23.6" />
        <circle cx="9.2" cy="9.5" r="0.9" fill="currentColor" stroke="none" />
        <circle cx="13" cy="9.5" r="0.9" fill="currentColor" stroke="none" />
        <path d="M10.7 17.1h10.6m-10.6 4.5h6.4" />
      </svg>
    ),
    ctaHint: "en 60 s",
  },
  {
    id: "offres-ecommerce",
    name: "E-commerce",
    tagline: "Boost ventes en ligne",
    price: "À partir de 5 900 €",
    description:
      "Vendez en ligne simplement avec un parcours d’achat fluide, des paiements sécurisés et des campagnes prêtes.",
    badge: "Lancement guidé",
    items: [
      "Catalogue modulable et fiches produits SEO",
      "Tunnel de commande optimisé mobile",
      "Email marketing automatisé dès le lancement",
    ],
    accent: "from-rose-500/30 via-orange-400/25 to-amber-400/20",
    icon: (
      <svg
        viewBox="0 0 32 32"
        className="h-10 w-10 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M6.5 8.5h21l-2 9.8a3 3 0 0 1-3 2.4H11.5a3 3 0 0 1-3-2.4l-2-9.8Z" />
        <path d="M12.2 24.8h9.7" />
        <circle cx="12.5" cy="26.5" r="1.7" fill="currentColor" stroke="none" />
        <circle cx="22.5" cy="26.5" r="1.7" fill="currentColor" stroke="none" />
      </svg>
    ),
    ctaHint: "coaching inclus",
  },
  {
    id: "offres-refonte",
    name: "Refonte & optimisation",
    tagline: "Relook & performances",
    price: "Sur devis",
    description:
      "Modernisez votre image, améliorez la vitesse et augmentez votre conversion sans repartir de zéro.",
    badge: "Audit complet offert",
    items: [
      "Audit complet UX, SEO et technique",
      "Roadmap claire : priorités, gains, budget",
      "Mise en ligne sans interruption de service",
    ],
    accent: "from-indigo-400/35 via-blue-500/20 to-cyan-400/15",
    icon: (
      <svg
        viewBox="0 0 32 32"
        className="h-10 w-10 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M6.5 7h19a1.5 1.5 0 0 1 1.5 1.5V23a1.5 1.5 0 0 1-1.5 1.5H6.5A1.5 1.5 0 0 1 5 23V8.5A1.5 1.5 0 0 1 6.5 7Z" />
        <path d="M10 11.5h12M10 16h12M10 20.5h7" />
      </svg>
    ),
    ctaHint: "roadmap 48 h",
  },
  {
    id: "offres-saas",
    name: "SaaS",
    tagline: "Prototype 72h + suivi",
    price: "À partir de 2 900 €",
    description:
      "Développez votre solution SaaS innovante avec une équipe qui gère design, produit, développement et suivi.",
    badge: "Design system compris",
    items: [
      "Prototype cliquable offert",
      "Parcours utilisateur testé en conditions réelles",
      "Monitoring et support utilisateurs inclus",
    ],
    accent: "from-fuchsia-500/35 via-indigo-500/25 to-slate-500/20",
    icon: (
      <svg
        viewBox="0 0 32 32"
        className="h-10 w-10 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="5.5" y="6.5" width="21" height="19" rx="2.5" />
        <path d="M9.5 11.5h13M9.5 16h7M9.5 20.5h5" />
        <circle cx="23" cy="16" r="2.5" />
      </svg>
    ),
    ctaHint: "atelier offert",
  },
  {
    id: "offres-application-mobile",
    name: "Application Mobile",
    tagline: "iOS & Android",
    price: "À partir de 2 900 €",
    description:
      "Créez votre application mobile native ou cross-platform avec une interface intuitive et des performances optimales.",
    badge: "Design UX/UI inclus",
    items: [
      "Application native iOS et Android",
      "Interface utilisateur intuitive et moderne",
      "Publication sur les stores incluse",
    ],
    accent: "from-fuchsia-500/35 via-indigo-500/25 to-slate-500/20",
    icon: (
      <svg
        viewBox="0 0 32 32"
        className="h-10 w-10 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="8" y="4" width="16" height="24" rx="2" />
        <path d="M12 8h8M12 24h8" />
        <circle cx="16" cy="16" r="2" />
      </svg>
    ),
    ctaHint: "prototype offert",
  },
  {
    id: "offres-seo",
    name: "SEO & Google Ads",
    tagline: "Visibilité durable",
    price: "Pack mensuel dès 790 €",
    description:
      "Soyez visible sur vos mots-clés et transformez vos visites en opportunités avec un plan d’actions simple.",
    badge: "Pilotage mensuel",
    items: [
      "Étude de mots-clés et contenu guidé",
      "Optimisations techniques et netlinking",
      "Rapports mensuels clairs et digestes",
    ],
    accent: "from-lime-400/35 via-emerald-400/20 to-teal-400/15",
    icon: (
      <svg
        viewBox="0 0 32 32"
        className="h-10 w-10 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M7 23.5c2.4-5.4 6-8.1 13-8.1" />
        <path d="M20.5 5.5v8h8" />
        <path d="M20 10.7 26.5 5" />
        <path d="M9 26.5h18" />
      </svg>
    ),
    ctaHint: "tableau de bord",
  },
  {
    id: "offres-maintenance",
    name: "Maintenance & bug fix",
    tagline: "Sérénité & support",
    price: "À partir de 190 €/mois",
    description:
      "Sécurisez votre site, corrigez les bugs et bénéficiez d’un support réactif par un interlocuteur unique.",
    badge: "Support 24/7",
    items: [
      "Surveillance 24/7 et sauvegardes quotidiennes",
      "Corrections garanties sous 24h ouvrées",
      "Améliorations régulières et coaching",
    ],
    accent: "from-slate-400/35 via-slate-500/20 to-indigo-500/20",
    icon: (
      <svg
        viewBox="0 0 32 32"
        className="h-10 w-10 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M6 12.5h20v6.5a8 8 0 0 1-8 8h-4a8 8 0 0 1-8-8v-6.5Z" />
        <path d="M12 12.5V10a4 4 0 0 1 8 0v2.5" />
        <path d="M16 19.5v3" />
      </svg>
    ),
    ctaHint: "sans engagement",
  },
];

export function OffersSection() {
  const cardsPerView = 3;
  const [searchQuery, setSearchQuery] = useState("");
  
  // Fonction de recherche fuzzy avec tolérance d'erreur
  const fuzzyMatch = (text: string, query: string): boolean => {
    if (!query) return true;
    
    const normalizedText = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, " ");
    const normalizedQuery = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, " ");
    
    // Recherche exacte
    if (normalizedText.includes(normalizedQuery)) return true;
    
    // Recherche par mots (si plusieurs mots)
    const queryWords = normalizedQuery.split(" ").filter(w => w.length > 0);
    if (queryWords.length > 1) {
      return queryWords.every(word => normalizedText.includes(word));
    }
    
    // Recherche avec tolérance d'erreur pour un seul mot
    // Vérifier si les caractères du query sont présents dans l'ordre (avec tolérance)
    let textIndex = 0;
    let queryIndex = 0;
    let skipped = 0;
    const maxSkip = Math.ceil(normalizedQuery.length * 0.4); // 40% de tolérance
    
    while (textIndex < normalizedText.length && queryIndex < normalizedQuery.length) {
      if (normalizedText[textIndex] === normalizedQuery[queryIndex]) {
        queryIndex++;
        skipped = 0; // Reset le compteur de skip quand on trouve une correspondance
      } else {
        skipped++;
        if (skipped > maxSkip) {
          // Trop de caractères sautés, pas de correspondance
          return false;
        }
      }
      textIndex++;
    }
    
    return queryIndex === normalizedQuery.length;
  };
  
  // Trouver l'index de l'offre correspondante à la recherche (priorité au titre)
  const findMatchingOfferIndex = () => {
    if (!searchQuery) return null;
    
    let titleMatchIndex = null;
    let otherMatchIndex = null;
    
    for (let i = 0; i < offers.length; i++) {
      const offer = offers[i];
      
      // Priorité 1 : Recherche dans le titre
      if (fuzzyMatch(offer.name, searchQuery)) {
        titleMatchIndex = i;
        break; // On prend le premier match dans le titre
      }
      
      // Priorité 2 : Recherche dans les autres champs (seulement si pas de match titre trouvé)
      if (titleMatchIndex === null) {
        const searchText = `${offer.description} ${offer.badge} ${offer.items.join(" ")}`;
        if (fuzzyMatch(searchText, searchQuery)) {
          if (otherMatchIndex === null) {
            otherMatchIndex = i; // On garde le premier match dans les autres champs
          }
        }
      }
    }
    
    // Retourner le match titre en priorité, sinon le match autre
    return titleMatchIndex !== null ? titleMatchIndex : otherMatchIndex;
  };
  
  const matchingIndex = findMatchingOfferIndex();
  
  // Dupliquer les offres 3 fois pour l'effet infini (garder l'ordre original)
  const duplicatedOffers = [...offers, ...offers, ...offers];
  const startIndex = offers.length; // Commencer au milieu
  
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [isTransitioning, setIsTransitioning] = useState(true);
  
  // Repositionner le slider sur l'offre correspondante quand la recherche change
  useEffect(() => {
    if (matchingIndex !== null) {
      // Positionner pour que l'offre correspondante soit au centre
      // On veut que l'offre soit à la position 1 (milieu des 3 cartes)
      const targetIndex = offers.length + matchingIndex - 1; // -1 pour centrer
      setIsTransitioning(true);
      setCurrentIndex(targetIndex);
    } else if (!searchQuery) {
      // Si pas de recherche, revenir au centre
      setIsTransitioning(true);
      setCurrentIndex(startIndex);
    }
  }, [searchQuery, matchingIndex, offers.length, startIndex]);
  
  const nextSlide = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      const next = prev + 1;
      // Si on arrive à la fin de la deuxième série, on saute au début de la deuxième série (milieu) sans transition
      if (next >= offers.length * 2) {
        setTimeout(() => {
          setIsTransitioning(false);
          setCurrentIndex(offers.length);
          setTimeout(() => setIsTransitioning(true), 50);
        }, 500);
        return next;
      }
      return next;
    });
  };
  
  const prevSlide = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      const next = prev - 1;
      // Si on arrive au début de la première série, on saute à la fin de la deuxième série (milieu) sans transition
      if (next < offers.length) {
        setTimeout(() => {
          setIsTransitioning(false);
          setCurrentIndex(offers.length * 2 - 1);
          setTimeout(() => setIsTransitioning(true), 50);
        }, 500);
        return next;
      }
      return next;
    });
  };
  
  const goToSlide = (index: number) => {
    setIsTransitioning(true);
    setCurrentIndex(offers.length + index);
  };
  
  return (
    <section
      id="offres"
      className="border-t border-white/10 py-24"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6">
        <div className="flex flex-col gap-6 text-center items-center">
          <h2 className="text-3xl font-semibold sm:text-4xl text-white">
            Des offres adaptées à chaque besoin
          </h2>
          
          {/* Barre de recherche */}
          <div className="flex justify-center w-full max-w-[600px]">
            <div className="flex items-center gap-3 rounded-full border border-[#1C1C1C]/20 bg-[#FFFFFF] px-6 py-3 shadow-[0_18px_48px_rgba(0,0,0,0.32),0_0_20px_rgba(113,221,174,0.4),0_0_40px_rgba(113,221,174,0.2)] w-full">
              <Image
                src="/assets/main/fond-blanc/logo-sm.png"
                alt="Web Difference loupe"
                width={40}
                height={40}
                className="h-10 w-10 flex-shrink-0"
              />
              <input
                type="search"
                placeholder="Rechercher une offre..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-sm font-medium text-[#1C1C1C] bg-transparent border-none outline-none placeholder:text-[#1C1C1C]/60 flex-1"
              />
            </div>
          </div>
        </div>
        
        <div className="relative">
          {/* Boutons de navigation - plus espacés */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-[#71DDAE]/20 border-2 border-[#71DDAE]/40 text-white backdrop-blur-md transition-all duration-300 hover:bg-[#71DDAE]/30 hover:scale-110 hover:border-[#71DDAE]/60 shadow-lg md:flex hidden"
            aria-label="Précédent"
          >
            <FaChevronLeft className="text-2xl" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-[#71DDAE]/20 border-2 border-[#71DDAE]/40 text-white backdrop-blur-md transition-all duration-300 hover:bg-[#71DDAE]/30 hover:scale-110 hover:border-[#71DDAE]/60 shadow-lg md:flex hidden"
            aria-label="Suivant"
          >
            <FaChevronRight className="text-2xl" />
          </button>
          
          {/* Container du slider */}
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex gap-4"
              style={{ 
                transform: `translateX(calc(-${currentIndex} * ((100% + 1rem) / ${cardsPerView})))`,
                transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none'
              }}
            >
              {duplicatedOffers.map((offer, index) => {
                const isEcommerce = offer.id === "offres-ecommerce";
                const originalIndex = index % offers.length;
                const isMatching = matchingIndex !== null && originalIndex === matchingIndex;
                
                // Pour l'opacité, E-commerce plus visible
                const baseOpacity = isEcommerce ? "bg-[#71DDAE]/25" : "bg-[#71DDAE]/15";
                const hoverOpacity = isEcommerce ? "hover:bg-[#71DDAE]/35" : "hover:bg-[#71DDAE]/30";
                
                // Gradients alternés pour varier visuellement
                const gradientDirection = originalIndex % 2 === 0 
                  ? "bg-gradient-to-r from-[#2A9D7A] to-[#71DDAE]" 
                  : "bg-gradient-to-r from-[#71DDAE] to-[#2A9D7A]";
                
                const paddingClass = isEcommerce ? "p-5" : "p-4";
                
                // Style spécial pour la carte correspondante à la recherche
                const matchingStyle = isMatching 
                  ? "border-2 border-[#71DDAE] shadow-[0_0_30px_rgba(113,221,174,0.6)]" 
                  : "border border-white/5";
                
                return (
                <div
                  key={`${offer.id}-${index}`}
                  id={originalIndex === 0 ? offer.id : undefined}
                  className="flex-shrink-0 w-full md:w-[calc((100%-2rem)/3)]"
                >
                  <div
                    className={`group relative flex flex-col gap-3 rounded-2xl ${paddingClass} transition-all duration-300 ${baseOpacity} ${matchingStyle} backdrop-blur-sm shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-2 hover:border-[#71DDAE] z-10 h-full`}
                  >
              {/* Header avec gradient premium - taille uniforme */}
              <div className={`relative overflow-hidden rounded-xl ${gradientDirection} p-4 shadow-[inset_0_2px_8px_rgba(0,0,0,0.2)] transition-all duration-500`}>
                {/* Overlay avec pattern subtil */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.3)_1px,transparent_1px)] bg-[length:20px_20px]" />
                
                <div className="relative flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xl font-extrabold text-white tracking-tight drop-shadow-lg">
                      {offer.name}
                    </h3>
                  </div>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white/25 backdrop-blur-md border border-white/30 shadow-lg group-hover:bg-white/35 group-hover:scale-110 transition-all duration-500">
                    <div className="text-white drop-shadow-md">
                      {offer.icon}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-2 relative z-10">
                <p className="text-xs text-white/85 leading-snug line-clamp-2">{offer.description}</p>
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#71DDAE]/50 bg-gradient-to-r from-[#2A9D7A]/80 to-[#2A9D7A]/60 px-2.5 py-1 text-[10px] font-semibold text-white shadow-lg backdrop-blur-sm">
                  <span className="inline-block h-1 w-1 rounded-full bg-[#71DDAE] animate-pulse" />
                  {offer.badge}
                </span>
              </div>
              
              <ul className="space-y-1.5 text-xs relative z-10">
                {offer.items.slice(0, 3).map((item) => (
                  <li key={item} className="flex items-start gap-2 group/item">
                    <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded bg-gradient-to-br from-[#71DDAE] to-[#2A9D7A] text-[9px] font-bold text-[#1C1C1C] shadow-md group-hover/item:scale-110 transition-transform duration-300">
                      ✓
                    </span>
                    <span className="text-white/90 leading-snug pt-0.5 line-clamp-1">{item}</span>
                  </li>
                ))}
              </ul>
              
              <Link
                href="/devis"
                className="mt-auto relative z-10 inline-flex w-fit items-center justify-center gap-1.5 rounded-lg border-2 border-[#71DDAE]/60 bg-gradient-to-r from-[#2A9D7A]/70 to-[#2A9D7A]/50 px-4 py-2 text-xs font-bold text-white shadow-[0_4px_16px_rgba(42,157,122,0.4)] transition-all duration-300 hover:bg-gradient-to-r hover:from-[#2A9D7A] hover:to-[#2A9D7A] hover:border-[#71DDAE] hover:shadow-[0_6px_24px_rgba(113,221,174,0.5)] hover:scale-105 active:scale-100"
              >
                Réserver un appel gratuit
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
                  </div>
                </div>
              );
            })}
            </div>
          </div>
          
          {/* Indicateurs de pagination */}
          <div className="flex justify-center gap-2 mt-8">
            {offers.map((_, index) => {
              const displayIndex = ((currentIndex % offers.length) + offers.length) % offers.length;
              return (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    displayIndex === index 
                      ? 'w-8 bg-[#71DDAE]' 
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Aller à la slide ${index + 1}`}
                />
              );
            })}
          </div>
        </div>
        <div className="flex justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#71DDAE] to-[#2A9D7A] px-8 py-4 text-2xl font-extrabold tracking-wide text-[#1C1C1C] shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95"
            style={{
              height: "68px",
            }}
          >
            <FaCalendarAlt className="text-2xl" />
            Prendre un RDV
          </Link>
        </div>
      </div>
    </section>
  );
}
