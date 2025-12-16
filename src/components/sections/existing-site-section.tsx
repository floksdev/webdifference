"use client";

import Image from "next/image";

export function ExistingSiteSection() {
  // Fonction pour alterner les couleurs lettre par lettre
  const renderAlternatingText = (text: string, startIndex: number = 0) => {
    return text.split("").map((char, index) => {
      const isEven = (index + startIndex) % 2 === 0;
      return (
        <span
          key={index}
          className={isEven ? "text-[#E1B3C3]" : "text-white"}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      );
    });
  };

  return (
    <section className="border-t border-white/10 py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6">
        <div className="flex flex-col gap-3 text-center">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Votre <span className="text-[#E1B3C3] text-4xl sm:text-5xl font-bold">site</span> n'est pas passé entre <span className="text-[#E1B3C3] text-4xl sm:text-5xl font-bold">nos mains</span> ?
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
              className="w-auto h-auto max-w-[200px]"
            />
          </div>

          {/* Texte */}
          <div className="flex flex-col gap-4 text-center md:text-left">
            <h3 className="text-3xl font-bold sm:text-4xl md:text-5xl">
              {renderAlternatingText("Mais il a besoin de nous", 0)}
            </h3>
            <h3 className="text-3xl font-bold sm:text-4xl md:text-5xl flex items-baseline gap-2">
              <span>
                {renderAlternatingText("pour être sauver", "Mais il a besoin de nous".length)}
              </span>
              <Image
                src="/bouée.png"
                alt=""
                width={16}
                height={16}
                className="inline-block w-4 h-4 self-end mb-1"
              />
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
