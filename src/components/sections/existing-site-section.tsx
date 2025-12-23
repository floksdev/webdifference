 "use client";

import Image from "next/image";
import { useMemo } from "react";

export function ExistingSiteSection() {
  // Fonction helper pour compter les caractères non-espaces
  const countNonSpaceChars = (text: string) => {
    return text.split("").filter((char) => char !== " ").length;
  };

  // Fonction pour alterner les couleurs lettre par lettre (espaces ignorés)
  // Utilisation d'un préfixe unique pour éviter les conflits de clés entre desktop et mobile
  const renderAlternatingText = (text: string, startIndex: number = 0, prefix: string = "") => {
    let charIndex = startIndex;
    return text.split("").map((char, index) => {
      // Clé unique avec préfixe pour éviter les conflits d'hydratation
      const uniqueKey = `${prefix}-${text}-${index}`;
      
      if (char === " ") {
        // Utiliser un espace normal au lieu de \u00A0 pour éviter les problèmes d'hydratation
        return (
          <span key={uniqueKey}>
            {" "}
          </span>
        );
      }
      const isEven = charIndex % 2 === 0;
      charIndex++;
      return (
        <span
          key={uniqueKey}
          className={isEven ? "text-[#FFB3E0]" : "text-white"}
        >
          {char}
        </span>
      );
    });
  };

  // Calculer les indices de départ pour éviter les erreurs d'hydratation
  const desktopText1 = "Mais il a besoin de nous";
  const desktopText2 = "pour être sauvé";
  const mobileText1 = "Mais il a besoin de";
  const mobileText2 = "nous pour être";
  const mobileText3 = "sauvé";

  const desktopStartIndex2 = useMemo(() => countNonSpaceChars(desktopText1), []);
  const mobileStartIndex2 = useMemo(() => countNonSpaceChars(mobileText1), []);
  const mobileStartIndex3 = useMemo(() => countNonSpaceChars(mobileText1) + countNonSpaceChars(mobileText2), []);

  return (
    <section className="border-t border-white/10 py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6">
        <div className="flex flex-col gap-3 text-center">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Votre <span className="text-[#FFB3E0] text-4xl sm:text-5xl font-bold">site</span> n'est pas passé entre <span className="text-[#FFB3E0] text-4xl sm:text-5xl font-bold">nos mains</span> ?
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          {/* Image bouée */}
          <div className="flex-shrink-0">
            <Image
              src="/bouée.png"
              alt="Bouée de sauvetage"
              width={200}
              height={200}
              quality={75}
              sizes="(max-width: 768px) 150px, 200px"
              className="w-auto h-auto max-w-[200px]"
              loading="lazy"
            />
                </div>
                
          {/* Texte */}
          <div className="flex flex-col gap-4 text-center md:text-left items-center md:items-start">
            {/* Version PC */}
            <h3 className="hidden md:block text-3xl font-bold sm:text-4xl md:text-5xl">
              {renderAlternatingText(desktopText1, 0, "desktop")}
              <br />
              {renderAlternatingText(desktopText2, desktopStartIndex2, "desktop")}.
            </h3>
            {/* Version Mobile */}
            <h3 className="md:hidden text-3xl font-bold sm:text-4xl md:text-5xl">
              {renderAlternatingText(mobileText1, 0, "mobile")}
              <br />
              {renderAlternatingText(mobileText2, mobileStartIndex2, "mobile")}
              <br />
              {renderAlternatingText(mobileText3, mobileStartIndex3, "mobile")}.
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
