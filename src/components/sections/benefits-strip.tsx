import Image from "next/image";

const benefits = [
  {
    title: "Suivi instantané",
    description: "Suivez l’avancement du projet et recevez un lien d'accès dès le départ.",
    image: "/assets/main/suivientempsreel.png",
  },
  {
    title: "Résultats garantis",
    description: "Engagement sur les objectifs fixés ou ajustement jusqu'à satisfaction complète.",
    image: "/assets/main/resultatgaranti.png",
  },
  {
    title: "Fiabilité totale",
    description: "100 % de clients satisfaits, accompagnement humain et suivi sur-mesure.",
    image: "/assets/main/fiabilitetotale.png",
  },
  {
    title: "Rapidité au RDV",
    description: "Projet rendu avant la date prévue ou réduction immédiate sur le solde.",
    image: "/assets/main/rapiditeaurdv.png",
  },
];

export function BenefitsStrip() {
  return (
    <section className="border-t border-white/10 bg-[color:var(--color-background-strong)] py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6">
        <div className="flex flex-col gap-2 text-center">
          <div className="flex justify-center mb-2">
            <Image
              src="/assets/main/ouestladifférence.png"
              alt="Mais où est la différence ?"
              width={450}
              height={300}
              className="w-auto h-auto max-w-[450px]"
            />
          </div>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
          Mais <span className="text-[#71DDAE] text-4xl sm:text-5xl">où</span> est la <span className="text-[#71DDAE] text-4xl sm:text-5xl">différence</span> ?
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className={`group relative overflow-hidden rounded-3xl p-5 shadow-lg transition-transform hover:-translate-y-1 ${
                index % 2 === 0 
                  ? "bg-gradient-to-r from-[#2A9D7A] to-[#71DDAE]" 
                  : "bg-gradient-to-r from-[#71DDAE] to-[#2A9D7A]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Image
                  src={benefit.image}
                  alt={benefit.title}
                  width={60}
                  height={60}
                  className="h-16 w-auto flex-shrink-0"
                />
                <h3 className="text-3xl font-bold text-[#1C1C1C]">
                  {benefit.title}
                </h3>
              </div>
              <p className="mt-3 text-sm text-[#1C1C1C]/80">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
