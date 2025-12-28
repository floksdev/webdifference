import Image from "next/image";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[color:var(--color-background-strong)] flex items-center justify-center px-6 py-20">
      <div className="max-w-2xl w-full text-center">
        {/* Image 404 */}
        <div className="w-full flex justify-center mb-8">
          <Image
            src="/404-2.png"
            alt="404"
            width={300}
            height={225}
            className="w-auto h-auto max-w-[80%] sm:max-w-[300px] block mx-auto"
            priority
          />
        </div>

        {/* Message principal */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-4">
          <span className="text-[#71DDAE]">404</span>
        </h1>
        <p className="text-xl sm:text-2xl text-white/90 mb-3 font-medium">
          Page introuvable
        </p>
        <p className="text-base sm:text-lg text-white/60 mb-10 max-w-md mx-auto">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>

        {/* Bouton d'action */}
        <div className="flex items-center justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#71DDAE] to-[#2A9D7A] px-8 py-4 text-base font-semibold text-[#1C1C1C] shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <FaHome className="text-lg" />
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

