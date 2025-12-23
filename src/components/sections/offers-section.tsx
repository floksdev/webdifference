"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  FaCalendarAlt, 
  FaGlobe, 
  FaMobileAlt, 
  FaRobot,
  FaCheckCircle,
  FaPlusCircle,
  FaTools,
  FaBug,
  FaRedo,
  FaDesktop,
  FaShoppingCart,
  FaCloud
} from "react-icons/fa";

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
      <Image
        src="/vitrine2.png"
        alt="Site vitrine"
        width={40}
        height={40}
        className="h-10 w-10 object-contain"
      />
    ),
    ctaHint: "en 60 s",
  },
  {
    id: "offres-ecommerce",
    name: "E-commerce",
    tagline: "Boost ventes en ligne",
    price: "À partir de 5 900 €",
    description:
      "Vendez en ligne simplement avec un parcours d'achat fluide, des paiements sécurisés et des campagnes prêtes.",
    badge: "Lancement guidé",
    items: [
      "Catalogue modulable et fiches produits SEO",
      "Tunnel de commande optimisé mobile",
      "Email marketing automatisé dès le lancement",
    ],
    accent: "from-rose-500/30 via-orange-400/25 to-amber-400/20",
    icon: (
      <Image
        src="/ecom2.png"
        alt="E-commerce"
        width={40}
        height={40}
        className="h-10 w-10 object-contain"
      />
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
      <Image
        src="/refonte2.png"
        alt="Refonte & optimisation"
        width={40}
        height={40}
        className="h-10 w-10 object-contain"
      />
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
      <Image
        src="/saas3.png"
        alt="SaaS"
        width={40}
        height={40}
        className="h-10 w-10 object-contain"
      />
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
      <Image
        src="/mobile2.png"
        alt="Application Mobile"
        width={40}
        height={40}
        className="h-10 w-10 object-contain"
      />
    ),
    ctaHint: "prototype offert",
  },
  {
    id: "offres-maintenance",
    name: "Maintenance",
    tagline: "Sérénité & support",
    price: "À partir de 190 €/mois",
    description:
      "Sécurisez votre site, corrigez les bugs et bénéficiez d'un support réactif par un interlocuteur unique.",
    badge: "Support 24/7",
    items: [
      "Surveillance 24/7 et sauvegardes quotidiennes",
      "Corrections garanties sous 24h ouvrées",
      "Améliorations régulières et coaching",
    ],
    accent: "from-slate-400/35 via-slate-500/20 to-indigo-500/20",
    icon: (
      <Image
        src="/maintenance.png"
        alt="Maintenance"
        width={40}
        height={40}
        className="h-10 w-10 object-contain"
      />
    ),
    ctaHint: "sans engagement",
  },
  {
    id: "offres-correctifs",
    name: "Correction de bugs",
    tagline: "Résolution rapide",
    price: "À partir de 150 €",
    description:
      "Corrigez rapidement les bugs et problèmes techniques de votre site ou application avec un support réactif.",
    badge: "Intervention rapide",
    items: [
      "Diagnostic et correction sous 48h",
      "Corrections de bugs critiques prioritaires",
      "Rapport détaillé des interventions",
    ],
    accent: "from-orange-400/35 via-red-500/25 to-pink-500/20",
    icon: (
      <Image
        src="/bug.png"
        alt="Correction de bugs"
        width={40}
        height={40}
        className="h-10 w-10 object-contain"
      />
    ),
    ctaHint: "intervention rapide",
  },
  {
    id: "offres-refonte-app-mobile",
    name: "Refonte App Mobile",
    tagline: "Modernisation iOS & Android",
    price: "Sur devis",
    description:
      "Modernisez votre application mobile existante avec une nouvelle interface, de meilleures performances et les dernières fonctionnalités.",
    badge: "Audit UX/UI offert",
    items: [
      "Audit complet de l'app existante",
      "Refonte UI/UX moderne et intuitive",
      "Optimisation des performances",
    ],
    accent: "from-purple-400/35 via-indigo-500/25 to-blue-500/20",
    icon: (
      <Image
        src="/refonte2.png"
        alt="Refonte App Mobile"
        width={40}
        height={40}
        className="h-10 w-10 object-contain"
      />
    ),
    ctaHint: "audit offert",
  },
  {
    id: "offres-automatisation",
    name: "Automatisation",
    tagline: "Gain de temps garanti",
    price: "Sur devis",
    description:
      "Automatisez vos processus métier avec des workflows intelligents : devis, signature, facturation, notifications et rapports.",
    badge: "Workflow documenté",
    items: [
      "Devis & signature instantanés",
      "Onboarding client guidé",
      "Suivi des performances automatisé",
    ],
    accent: "from-cyan-400/35 via-blue-500/25 to-indigo-500/20",
    icon: (
      <Image
        src="/automatisation.png"
        alt="Automatisation"
        width={40}
        height={40}
        className="h-10 w-10 object-contain"
      />
    ),
    ctaHint: "discuter automatisations",
  },
];

type QuestionStep =
  | "initial"
  | "site-web-existing"
  | "site-web-creation"
  | "site-web-existing-type"
  | "site-web-creation-type"
  | "app-mobile-existing"
  | "app-mobile-creation"
  | "app-mobile-existing-type"
  | "results";

export function OffersSection() {
  const [currentStep, setCurrentStep] = useState<QuestionStep>("initial");
  const [selectedOffers, setSelectedOffers] = useState<string[]>([]);
    
  const handleInitialChoice = (choice: "site-web" | "app-mobile" | "automatisation") => {
    if (choice === "automatisation") {
      setSelectedOffers(["offres-automatisation"]);
      setCurrentStep("results");
    } else if (choice === "site-web") {
      setCurrentStep("site-web-existing");
    } else if (choice === "app-mobile") {
      setCurrentStep("app-mobile-existing");
    }
  };

  const handleSiteWebExisting = (hasSite: boolean) => {
    if (hasSite) {
      setCurrentStep("site-web-existing-type");
      } else {
      setCurrentStep("site-web-creation");
        }
  };

  const handleSiteWebExistingType = (type: "maintenance" | "correctifs" | "refonte") => {
    if (type === "maintenance") {
      setSelectedOffers(["offres-maintenance"]);
    } else if (type === "correctifs") {
      setSelectedOffers(["offres-correctifs"]);
    } else if (type === "refonte") {
      setSelectedOffers(["offres-refonte"]);
    }
    setCurrentStep("results");
  };

  const handleSiteWebCreation = () => {
    setCurrentStep("site-web-creation-type");
  };
  
  const handleSiteWebCreationType = (type: "vitrine" | "ecommerce" | "saas") => {
    if (type === "vitrine") {
      setSelectedOffers(["offres-site-vitrine"]);
    } else if (type === "ecommerce") {
      setSelectedOffers(["offres-ecommerce"]);
    } else if (type === "saas") {
      setSelectedOffers(["offres-saas"]);
    }
    setCurrentStep("results");
  };

  const handleAppMobileExisting = (hasApp: boolean) => {
    if (hasApp) {
      setCurrentStep("app-mobile-existing-type");
    } else {
      setSelectedOffers(["offres-application-mobile"]);
      setCurrentStep("results");
    }
  };

  const handleAppMobileExistingType = (type: "refonte" | "maintenance" | "correctifs") => {
    if (type === "refonte") {
      setSelectedOffers(["offres-refonte-app-mobile"]);
    } else if (type === "maintenance") {
      setSelectedOffers(["offres-maintenance"]);
    } else if (type === "correctifs") {
      setSelectedOffers(["offres-correctifs"]);
    }
    setCurrentStep("results");
  };

  const resetQuestionnaire = () => {
    setCurrentStep("initial");
    setSelectedOffers([]);
  };
  
  const renderQuestion = () => {
    switch (currentStep) {
      case "initial":
  return (
          <div className="space-y-6">
            <h3 className="text-2xl font-extrabold text-[#71DDAE]">
              Vos besoins concernent...
            </h3>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => handleInitialChoice("site-web")}
                className="group rounded-xl border-2 border-white/20 bg-white/5 px-6 py-4 text-left transition-all hover:border-[#71DDAE] hover:bg-white/10 flex items-center gap-3"
              >
                <FaGlobe className="text-xl text-white transition-colors group-hover:text-[#71DDAE]" />
                <span className="text-lg font-bold text-white transition-colors group-hover:text-[#71DDAE]">
                  Un site web
                </span>
              </button>
              <button
                onClick={() => handleInitialChoice("app-mobile")}
                className="group rounded-xl border-2 border-white/20 bg-white/5 px-6 py-4 text-left transition-all hover:border-[#71DDAE] hover:bg-white/10 flex items-center gap-3"
              >
                <FaMobileAlt className="text-xl text-white transition-colors group-hover:text-[#71DDAE]" />
                <span className="text-lg font-bold text-white transition-colors group-hover:text-[#71DDAE]">
                  Une application mobile
                </span>
              </button>
              <button
                onClick={() => handleInitialChoice("automatisation")}
                className="group rounded-xl border-2 border-white/20 bg-white/5 px-6 py-4 text-left transition-all hover:border-[#71DDAE] hover:bg-white/10 flex items-center gap-3"
              >
                <FaRobot className="text-xl text-white transition-colors group-hover:text-[#71DDAE]" />
                <span className="text-lg font-bold text-white transition-colors group-hover:text-[#71DDAE]">
                  De l'automatisation
                </span>
              </button>
            </div>
          </div>
        );

      case "site-web-existing":
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-extrabold text-[#71DDAE]">
              Avez-vous déjà un site web ?
            </h3>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => handleSiteWebExisting(true)}
                className="group rounded-xl border-2 border-white/20 bg-white/5 px-6 py-4 text-left transition-all hover:border-[#71DDAE] hover:bg-white/10 flex items-center gap-3"
              >
                <FaCheckCircle className="text-xl text-white transition-colors group-hover:text-[#71DDAE]" />
                <span className="text-lg font-semibold text-white transition-colors group-hover:text-[#71DDAE]">Oui, j'ai déjà un site</span>
              </button>
              <button
                onClick={() => handleSiteWebExisting(false)}
                className="group rounded-xl border-2 border-white/20 bg-white/5 px-6 py-4 text-left transition-all hover:border-[#71DDAE] hover:bg-white/10 flex items-center gap-3"
              >
                <FaPlusCircle className="text-xl text-white transition-colors group-hover:text-[#71DDAE]" />
                <span className="text-lg font-semibold text-white transition-colors group-hover:text-[#71DDAE]">Non, je souhaite en créer un</span>
              </button>
            </div>
            <button
              onClick={resetQuestionnaire}
              className="text-sm text-white/60 hover:text-white/80"
            >
              ← Retour
            </button>
        </div>
        );

      case "site-web-existing-type":
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-extrabold text-[#71DDAE]">
              Quelle prestation vous intéresse ?
            </h3>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => handleSiteWebExistingType("maintenance")}
                className="group rounded-xl border-2 border-white/20 bg-white/5 px-6 py-4 text-left transition-all hover:border-[#71DDAE] hover:bg-white/10 flex items-center gap-3"
              >
                <FaTools className="text-xl text-white transition-colors group-hover:text-[#71DDAE]" />
                <span className="text-lg font-semibold text-white transition-colors group-hover:text-[#71DDAE]">Maintenance</span>
              </button>
              <button
                onClick={() => handleSiteWebExistingType("correctifs")}
                className="group rounded-xl border-2 border-white/20 bg-white/5 px-6 py-4 text-left transition-all hover:border-[#71DDAE] hover:bg-white/10 flex items-center gap-3"
              >
                <FaBug className="text-xl text-white transition-colors group-hover:text-[#71DDAE]" />
                <span className="text-lg font-semibold text-white transition-colors group-hover:text-[#71DDAE]">Correction de bugs</span>
              </button>
              <button
                onClick={() => handleSiteWebExistingType("refonte")}
                className="group rounded-xl border-2 border-white/20 bg-white/5 px-6 py-4 text-left transition-all hover:border-[#71DDAE] hover:bg-white/10 flex items-center gap-3"
              >
                <FaRedo className="text-xl text-white transition-colors group-hover:text-[#71DDAE]" />
                <span className="text-lg font-semibold text-white transition-colors group-hover:text-[#71DDAE]">Refonte</span>
              </button>
            </div>
          <button
              onClick={() => setCurrentStep("site-web-existing")}
              className="text-sm text-white/60 hover:text-white/80"
          >
              ← Retour
          </button>
          </div>
        );

      case "site-web-creation":
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-extrabold text-[#71DDAE]">
              Quel type de site souhaitez-vous créer ?
            </h3>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => handleSiteWebCreationType("vitrine")}
                className="group rounded-xl border-2 border-white/20 bg-white/5 px-6 py-4 text-left transition-all hover:border-[#71DDAE] hover:bg-white/10 flex items-center gap-3"
              >
                <FaDesktop className="text-xl text-white transition-colors group-hover:text-[#71DDAE]" />
                <span className="text-lg font-semibold text-white transition-colors group-hover:text-[#71DDAE]">Site vitrine</span>
              </button>
              <button
                onClick={() => handleSiteWebCreationType("ecommerce")}
                className="group rounded-xl border-2 border-white/20 bg-white/5 px-6 py-4 text-left transition-all hover:border-[#71DDAE] hover:bg-white/10 flex items-center gap-3"
              >
                <FaShoppingCart className="text-xl text-white transition-colors group-hover:text-[#71DDAE]" />
                <span className="text-lg font-semibold text-white transition-colors group-hover:text-[#71DDAE]">E-commerce</span>
              </button>
              <button
                onClick={() => handleSiteWebCreationType("saas")}
                className="group rounded-xl border-2 border-white/20 bg-white/5 px-6 py-4 text-left transition-all hover:border-[#71DDAE] hover:bg-white/10 flex items-center gap-3"
              >
                <FaCloud className="text-xl text-white transition-colors group-hover:text-[#71DDAE]" />
                <span className="text-lg font-semibold text-white transition-colors group-hover:text-[#71DDAE]">SaaS</span>
              </button>
            </div>
          <button
              onClick={() => setCurrentStep("site-web-existing")}
              className="text-sm text-white/60 hover:text-white/80"
          >
              ← Retour
          </button>
          </div>
        );

      case "app-mobile-existing":
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-extrabold text-[#71DDAE]">
              Avez-vous déjà une application mobile ?
            </h3>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => handleAppMobileExisting(true)}
                className="group rounded-xl border-2 border-white/20 bg-white/5 px-6 py-4 text-left transition-all hover:border-[#71DDAE] hover:bg-white/10 flex items-center gap-3"
              >
                <FaCheckCircle className="text-xl text-white transition-colors group-hover:text-[#71DDAE]" />
                <span className="text-lg font-semibold text-white transition-colors group-hover:text-[#71DDAE]">Oui, j'ai déjà une app</span>
              </button>
              <button
                onClick={() => handleAppMobileExisting(false)}
                className="group rounded-xl border-2 border-white/20 bg-white/5 px-6 py-4 text-left transition-all hover:border-[#71DDAE] hover:bg-white/10 flex items-center gap-3"
              >
                <FaPlusCircle className="text-xl text-white transition-colors group-hover:text-[#71DDAE]" />
                <span className="text-lg font-semibold text-white transition-colors group-hover:text-[#71DDAE]">Non, je souhaite en créer une</span>
              </button>
            </div>
            <button
              onClick={resetQuestionnaire}
              className="text-sm text-white/60 hover:text-white/80"
            >
              ← Retour
            </button>
          </div>
        );

      case "app-mobile-existing-type":
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-extrabold text-[#71DDAE]">
              Quelle prestation vous intéresse ?
            </h3>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => handleAppMobileExistingType("refonte")}
                className="group rounded-xl border-2 border-white/20 bg-white/5 px-6 py-4 text-left transition-all hover:border-[#71DDAE] hover:bg-white/10 flex items-center gap-3"
              >
                <FaRedo className="text-xl text-white transition-colors group-hover:text-[#71DDAE]" />
                <span className="text-lg font-semibold text-white transition-colors group-hover:text-[#71DDAE]">Refonte</span>
              </button>
              <button
                onClick={() => handleAppMobileExistingType("maintenance")}
                className="group rounded-xl border-2 border-white/20 bg-white/5 px-6 py-4 text-left transition-all hover:border-[#71DDAE] hover:bg-white/10 flex items-center gap-3"
              >
                <FaTools className="text-xl text-white transition-colors group-hover:text-[#71DDAE]" />
                <span className="text-lg font-semibold text-white transition-colors group-hover:text-[#71DDAE]">Maintenance</span>
              </button>
              <button
                onClick={() => handleAppMobileExistingType("correctifs")}
                className="group rounded-xl border-2 border-white/20 bg-white/5 px-6 py-4 text-left transition-all hover:border-[#71DDAE] hover:bg-white/10 flex items-center gap-3"
              >
                <FaBug className="text-xl text-white transition-colors group-hover:text-[#71DDAE]" />
                <span className="text-lg font-semibold text-white transition-colors group-hover:text-[#71DDAE]">Correction de bugs</span>
              </button>
            </div>
            <button
              onClick={() => setCurrentStep("app-mobile-existing")}
              className="text-sm text-white/60 hover:text-white/80"
            >
              ← Retour
            </button>
          </div>
        );

      case "results":
        const offersToShow = offers.filter((offer) =>
          selectedOffers.includes(offer.id)
        );

        return (
          <div className="space-y-4 sm:space-y-6 w-full overflow-x-hidden">
            {/* Image en premier sur mobile uniquement */}
            <div className="relative w-full h-[120px] sm:hidden rounded-2xl overflow-hidden order-1 mt-16 mb-6">
              <Image
                src="/conceptionweb.png"
                alt="Conception web"
                fill
                className="object-cover object-top"
                sizes="100vw"
              />
            </div>
            
            {/* Titre et bouton Recommencer */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 relative z-20 order-2">
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                Offre recommandée
              </h3>
              <button
                onClick={resetQuestionnaire}
                className="text-sm text-white/60 hover:text-white/80 underline sm:no-underline relative z-20"
              >
                Recommencer
              </button>
            </div>
            
            {/* Carte */}
            <div className="grid gap-6 md:grid-cols-1 w-full max-w-full sm:max-w-2xl mx-auto order-3">
              {offersToShow.map((offer) => {
                return (
                  <article
                    key={offer.id}
                    className="group relative flex flex-col gap-4 sm:gap-6 rounded-3xl p-4 sm:p-8 transition-all duration-300 bg-gradient-to-r from-[#71DDAE] to-[#2A9D7A] shadow-[0_4px_12px_rgba(113,221,174,0.15)] sm:shadow-[0_8px_24px_rgba(113,221,174,0.2)] hover:shadow-[0_6px_16px_rgba(113,221,174,0.2)] sm:hover:shadow-[0_12px_32px_rgba(113,221,174,0.3)] w-full max-w-full overflow-hidden"
                  >
                    {/* Badge premium en haut à droite */}
                    <div className="absolute top-3 right-3 sm:top-6 sm:right-6 flex items-center gap-2 rounded-full bg-[#1C1C1C] backdrop-blur-sm border border-white/50 px-3 py-1 sm:px-4 sm:py-1.5 shadow-lg">
                      <span className="inline-flex h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#71DDAE]"></span>
                      <span className="text-[10px] sm:text-xs font-semibold text-white">{offer.badge}</span>
                    </div>

                    {/* Header avec icône et titre */}
                    <div className="rounded-2xl bg-white p-3 sm:p-5 shadow-lg">
                      <div className="flex items-center justify-start gap-3 sm:gap-5">
                        <div className="flex h-12 w-12 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl bg-[#71DDAE]/20 backdrop-blur-md border-2 border-[#71DDAE]/40 shadow-xl group-hover:scale-110 transition-transform duration-300">
                          <div className="text-black scale-125">
                            {offer.icon}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 sm:gap-3">
                          <h3 className="text-xl sm:text-3xl font-extrabold text-black leading-tight text-left">
                      {offer.name}
                    </h3>
                  </div>
                      </div>
                    </div>

                    {/* Description accrocheuse */}
                    <p className="text-sm sm:text-base text-black/85 leading-relaxed font-medium -mt-2">
                      {offer.description}
                    </p>

                    {/* Liste des bénéfices premium */}
                    <div className="space-y-2 sm:space-y-3">
                      <h4 className="text-xs sm:text-sm font-bold text-black/60 uppercase tracking-wider">
                        Ce qui est inclus
                      </h4>
                      <div className="rounded-2xl bg-white/20 backdrop-blur-lg border border-white/30 p-3 sm:p-5 shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
                        <ul className="space-y-2 sm:space-y-3">
                          {offer.items.map((item) => (
                            <li key={item} className="flex items-start gap-2 sm:gap-3">
                              <div className="mt-0.5 flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-full bg-white/40 border-2 border-white/60 shadow-md">
                                <span className="text-[#2A9D7A] text-[10px] sm:text-xs font-bold">✓</span>
              </div>
                              <span className="text-sm sm:text-base text-black font-medium leading-relaxed pt-0.5">
                                {item}
                    </span>
                  </li>
                ))}
              </ul>
                      </div>
                    </div>
              
                    {/* CTA premium */}
              <Link
                      href="https://calendly.com/webdifference/nouvelle-reunion"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 sm:mt-4 inline-flex w-full items-center justify-center gap-2 sm:gap-3 rounded-2xl bg-[#1C1C1C] px-4 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-bold text-white shadow-[0_8px_24px_rgba(28,28,28,0.4)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_32px_rgba(28,28,28,0.5)] active:scale-100"
              >
                      <FaCalendarAlt className="text-lg sm:text-xl" />
                      <span>Réserver un appel gratuit</span>
                      <span className="text-lg sm:text-xl">→</span>
              </Link>
                  </article>
              );
            })}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

              return (
    <section id="offres" className="border-t border-white/10 py-24 overflow-x-hidden">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:gap-12 px-6 w-full">
        <div className="flex flex-col gap-6 text-center items-center">
          <h2 className="text-3xl font-semibold sm:text-4xl text-white">
            Des <span className="text-[#71DDAE] text-4xl sm:text-5xl font-bold">offres</span> adaptées à chaque <span className="text-[#71DDAE] text-4xl sm:text-5xl font-bold">besoin</span>
          </h2>
        </div>

        <div className="grid gap-0 sm:gap-8 lg:gap-12 lg:grid-cols-2 lg:items-start">
          {/* Image à gauche - cachée sur mobile si results */}
          <div className={`relative w-full h-full min-h-[250px] sm:min-h-[400px] md:min-h-[500px] rounded-2xl overflow-hidden ${currentStep === "results" ? "hidden sm:block" : ""}`}>
            <Image
              src="/conceptionweb.png"
              alt="Conception web"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Questions à droite */}
          <div className="flex flex-col justify-center min-h-[500px] -mt-16 sm:mt-0">
            {renderQuestion()}
          </div>
        </div>

        <div className="flex justify-center -mt-24 sm:mt-0">
          <Link
            href="https://calendly.com/webdifference/nouvelle-reunion"
            target="_blank"
            rel="noopener noreferrer"
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
