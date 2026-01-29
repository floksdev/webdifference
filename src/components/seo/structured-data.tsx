"use client";

import { useEffect } from "react";

export function StructuredData() {
  useEffect(() => {
    // Données structurées pour Organization
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Web Difference",
      url: "https://www.webdifference.fr",
      logo: "https://www.webdifference.fr/assets/main/fond-vert/logo-full.png",
      description: "Agence web et développeur web spécialisé dans la création de sites web professionnels sur mesure",
      address: {
        "@type": "PostalAddress",
        streetAddress: "7 rue Valette",
        addressLocality: "Paris",
        postalCode: "75005",
        addressCountry: "FR",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+33-6-38-72-30-38",
        contactType: "customer service",
        email: "contact@webdifference.fr",
        areaServed: "FR",
        availableLanguage: "French",
      },
      sameAs: [
        "https://www.webdifference.fr",
      ],
    };

    // Données structurées pour LocalBusiness
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://www.webdifference.fr/#organization",
      name: "Web Difference",
      image: "https://www.webdifference.fr/assets/main/fond-vert/logo-full.png",
      description: "Développeur web et agence web spécialisée dans la création de sites web professionnels",
      address: {
        "@type": "PostalAddress",
        streetAddress: "7 rue Valette",
        addressLocality: "Paris",
        addressRegion: "Île-de-France",
        postalCode: "75005",
        addressCountry: "FR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "48.8506",
        longitude: "2.3442",
      },
      url: "https://www.webdifference.fr",
      telephone: "+33-6-38-72-30-38",
      email: "contact@webdifference.fr",
      priceRange: "€€",
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "09:00",
        closes: "18:00",
      },
    };

    // Données structurées pour Service
    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Création de sites web",
      provider: {
        "@type": "LocalBusiness",
        name: "Web Difference",
      },
      areaServed: {
        "@type": "Country",
        name: "France",
      },
      description: "Création de sites web professionnels, développement web, refonte de site, SEO, automatisation",
      offers: {
        "@type": "Offer",
        priceCurrency: "EUR",
        price: "2900",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "2900",
          priceCurrency: "EUR",
          valueAddedTaxIncluded: true,
        },
      },
    };

    // Données structurées pour WebSite
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Web Difference",
      url: "https://www.webdifference.fr",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://www.webdifference.fr/guides?search={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    };

    // Données structurées pour ProfessionalService
    const professionalServiceSchema = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "Web Difference - Développeur Web & Agence Web",
      description: "Développeur web et agence web spécialisée dans la création de sites web professionnels, développement web, refonte de site",
      url: "https://www.webdifference.fr",
      address: {
        "@type": "PostalAddress",
        streetAddress: "7 rue Valette",
        addressLocality: "Paris",
        postalCode: "75005",
        addressCountry: "FR",
      },
      telephone: "+33-6-38-72-30-38",
      email: "contact@webdifference.fr",
      areaServed: "FR",
    };

    // Fonction pour ajouter le script JSON-LD
    const addStructuredData = (schema: object, id: string) => {
      // Vérifier si le script existe déjà
      if (document.getElementById(id)) {
        return;
      }

      const script = document.createElement("script");
      script.id = id;
      script.type = "application/ld+json";
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    };

    // Ajouter tous les schémas
    addStructuredData(organizationSchema, "schema-organization");
    addStructuredData(localBusinessSchema, "schema-local-business");
    addStructuredData(serviceSchema, "schema-service");
    addStructuredData(websiteSchema, "schema-website");
    addStructuredData(professionalServiceSchema, "schema-professional-service");

    // Cleanup
    return () => {
      ["schema-organization", "schema-local-business", "schema-service", "schema-website", "schema-professional-service"].forEach((id) => {
        const script = document.getElementById(id);
        if (script) {
          script.remove();
        }
      });
    };
  }, []);

  return null;
}

