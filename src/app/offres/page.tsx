"use client";

import { OffersSection } from "@/components/sections/offers-section";
import Link from "next/link";
import Image from "next/image";
import { FaCalendarAlt } from "react-icons/fa";

// Les offres (même structure que dans offers-section.tsx)
const allOffers = [
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
    icon: (
      <Image
        src="/vitrine2.png"
        alt="Site vitrine"
        width={40}
        height={40}
        className="h-10 w-10 object-contain"
      />
    ),
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
    icon: (
      <Image
        src="/ecom2.png"
        alt="E-commerce"
        width={40}
        height={40}
        className="h-10 w-10 object-contain"
      />
    ),
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
    icon: (
      <Image
        src="/saas3.png"
        alt="SaaS"
        width={40}
        height={40}
        className="h-10 w-10 object-contain"
      />
    ),
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
    icon: (
      <Image
        src="/refonte2.png"
        alt="Refonte & optimisation"
        width={40}
        height={40}
        className="h-10 w-10 object-contain"
      />
    ),
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
    icon: (
      <Image
        src="/maintenance.png"
        alt="Maintenance"
        width={40}
        height={40}
        className="h-10 w-10 object-contain"
      />
    ),
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
    icon: (
      <Image
        src="/bug.png"
        alt="Correction de bugs"
        width={40}
        height={40}
        className="h-10 w-10 object-contain"
      />
    ),
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
    icon: (
      <Image
        src="/mobile2.png"
        alt="Application Mobile"
        width={40}
        height={40}
        className="h-10 w-10 object-contain"
      />
    ),
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
    icon: (
      <Image
        src="/refonte2.png"
        alt="Refonte App Mobile"
        width={40}
        height={40}
        className="h-10 w-10 object-contain"
      />
    ),
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
    icon: (
      <Image
        src="/automatisation.png"
        alt="Automatisation"
        width={40}
        height={40}
        className="h-10 w-10 object-contain"
      />
    ),
  },
];

export default function OffersPage() {
  return (
    <>
      <OffersSection />
      
      {/* Section toutes les offres */}
      <section className="border-t border-white/10 py-12 sm:py-24 overflow-x-hidden">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:gap-12 px-4 sm:px-6 w-full">
          <div className="flex flex-col gap-4 sm:gap-6 text-center items-center">
            <h2 className="text-2xl sm:text-3xl font-semibold sm:text-4xl text-white">
              Toutes nos <span className="text-[#71DDAE] text-3xl sm:text-4xl md:text-5xl font-bold">offres</span>
            </h2>
        </div>

          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 w-full">
            {allOffers.map((offer) => (
          <article
                key={offer.id}
                className="group relative flex flex-col gap-4 sm:gap-6 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 transition-all duration-300 bg-gradient-to-r from-[#71DDAE] to-[#2A9D7A] shadow-[0_20px_60px_rgba(113,221,174,0.3)] hover:shadow-[0_25px_80px_rgba(113,221,174,0.4)] w-full min-w-0"
              >
                {/* Badge premium en haut à droite */}
                <div className="absolute top-3 right-3 sm:top-6 sm:right-6 flex items-center gap-1.5 sm:gap-2 rounded-full bg-[#1C1C1C] backdrop-blur-sm border border-white/50 px-2.5 sm:px-4 py-1 sm:py-1.5 shadow-lg">
                  <span className="inline-flex h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#71DDAE]"></span>
                  <span className="text-[10px] sm:text-xs font-semibold text-white whitespace-nowrap">{offer.badge}</span>
                </div>

                {/* Header avec icône et titre */}
                <div className="rounded-xl sm:rounded-2xl bg-white p-3 sm:p-4 md:p-5 shadow-lg">
                  <div className="flex items-center justify-start gap-3 sm:gap-4 md:gap-5">
                    <div className="flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-[#71DDAE]/20 backdrop-blur-md border-2 border-[#71DDAE]/40 shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <div className="text-black scale-110 sm:scale-125">
                        {offer.icon}
                      </div>
                    </div>
                    <div className={`flex flex-col gap-1.5 sm:gap-2 md:gap-3 min-w-0 flex-1 ${offer.id === "offres-automatisation" ? "-ml-1 sm:-ml-2" : ""}`}>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-black leading-tight text-left break-words">
                        {offer.name}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Description accrocheuse */}
                <p className="text-sm sm:text-base text-black/85 leading-relaxed font-medium -mt-1 sm:-mt-2">
                  {offer.description}
                </p>

                {/* Liste des bénéfices premium */}
                <div className="space-y-2 sm:space-y-3">
                  <h4 className="text-xs sm:text-sm font-bold text-black/60 uppercase tracking-wider">
                    Ce qui est inclus
                  </h4>
                  <div className="rounded-xl sm:rounded-2xl bg-white/20 backdrop-blur-lg border border-white/30 p-3 sm:p-4 md:p-5 shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
                    <ul className="space-y-2 sm:space-y-3">
                      {offer.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 sm:gap-3">
                          <div className="mt-0.5 flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-full bg-white/40 border-2 border-white/60 shadow-md">
                            <span className="text-[#2A9D7A] text-[10px] sm:text-xs font-bold">✓</span>
                          </div>
                          <span className="text-sm sm:text-base text-black font-medium leading-relaxed pt-0.5 break-words">
                            {item}
              </span>
                        </li>
              ))}
            </ul>
                  </div>
                </div>

                {/* CTA premium */}
            <Link
                  href="https://calendly.com/webdifference/nouvelle-reunion?hide_gdpr_banner=1&background_color=282828&text_color=ffffff&primary_color=71ddae&month=2025-12"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 sm:mt-4 inline-flex w-full items-center justify-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl bg-[#1C1C1C] px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold text-white shadow-[0_8px_24px_rgba(28,28,28,0.4)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_32px_rgba(28,28,28,0.5)] active:scale-100"
                >
                  <FaCalendarAlt className="text-lg sm:text-xl shrink-0" />
                  <span className="whitespace-nowrap">Réserver un appel gratuit</span>
                  <span className="text-lg sm:text-xl shrink-0">→</span>
            </Link>
          </article>
        ))}
          </div>
        </div>
      </section>
    </>
  );
}
