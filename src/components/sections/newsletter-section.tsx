"use client";

import { useState, KeyboardEvent } from "react";
import Link from "next/link";
import { Notification } from "@/components/ui/notification";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const validateEmail = (value: string): string | null => {
    if (!value.trim()) {
      return "Veuillez saisir une adresse email.";
    }
    
    if (!value.includes("@")) {
      return "L'adresse mail saisie est incomplète.";
    }
    
    const parts = value.split("@");
    if (parts.length !== 2) {
      return "L'adresse email ne peut contenir qu'un seul symbole \"@\".";
    }
    
    const [localPart, domain] = parts;
    
    if (!localPart || localPart.trim().length === 0) {
      return "La partie avant \"@\" ne peut pas être vide.";
    }
    
    if (!domain || domain.trim().length === 0) {
      return "La partie après \"@\" ne peut pas être vide.";
    }
    
    if (!domain.includes(".")) {
      return "L'adresse email doit contenir un point (.) après le symbole \"@\".";
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "Le format de l'adresse email est invalide.";
    }
    
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const error = validateEmail(email);
    if (error) {
      setNotification({
        message: error,
        type: "error",
      });
      return;
    }

    setIsLoading(true);
    setNotification(null);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setNotification({
          message: data.error || "Une erreur est survenue. Veuillez réessayer.",
          type: "error",
        });
        return;
      }

      setNotification({
        message: data.message || "Inscription réussie !",
        type: "success",
      });
      setEmail("");
    } catch (error) {
      setNotification({
        message: "Erreur de connexion. Vérifiez votre connexion internet et réessayez.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading && email.trim()) {
        handleSubmit(e as any);
      }
    }
  };

  return (
    <section className="border-t border-white/10 py-12 sm:py-24 relative overflow-hidden">
      {/* Fond avec dégradé métallique et brillance */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 25%, #1a1a1a 50%, #2d2d2d 75%, #1a1a1a 100%)',
        }}
      />
      
      {/* Effet de brillance animé */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)',
          animation: 'shimmer 3s infinite',
        }}
      />
      
      <div className="mx-auto flex max-w-5xl flex-col gap-6 sm:gap-12 px-6 relative z-10">
        {/* Titre premium avec effet métallique */}
        <div className="flex flex-col gap-6 text-center">
          <h2 
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold relative"
            style={{
              background: 'linear-gradient(135deg, #FAFAFA 0%, #E6E6E6 25%, #CFCFCF 50%, #B8B8B8 75%, #9E9E9E 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 30px rgba(255, 255, 255, 0.3)',
            }}
          >
            Restons en contact
          </h2>
          <p className="text-base sm:text-lg text-white/80 font-medium">
            Recevez nos guides, astuces et actualités directement dans votre boîte mail.
          </p>
        </div>
        
        {/* Formulaire premium dans un conteneur brillant */}
        <div 
          className="relative rounded-3xl p-4 sm:p-8 md:p-12"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
            backdropFilter: 'blur(20px)',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 0 80px rgba(113, 221, 174, 0.2)',
          }}
        >
          {/* Overlay brillant */}
          <div 
            className="absolute inset-0 rounded-3xl pointer-events-none opacity-40"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, transparent 50%, rgba(255, 255, 255, 0.1) 100%)',
            }}
          />
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-10" noValidate>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <div className="flex-1 w-full">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Votre adresse email"
                  disabled={isLoading}
                  className="w-full rounded-2xl border-2 border-white/30 bg-white/10 backdrop-blur-md px-4 sm:px-6 py-3 sm:py-5 text-white placeholder:text-white/60 focus:outline-none focus:border-[#71DDAE] focus:ring-4 focus:ring-[#71DDAE]/30 focus:bg-white/15 transition-all text-base sm:text-lg font-medium shadow-[0_8px_32px_rgba(0,0,0,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.2), 0 0 20px rgba(113, 221, 174, 0.1)',
                  }}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="rounded-2xl bg-gradient-to-r from-[#71DDAE] via-[#5BCA9D] to-[#2A9D7A] px-6 sm:px-10 py-3 sm:py-5 font-bold text-lg sm:text-2xl transition-all shadow-[0_8px_32px_rgba(113,221,174,0.4)] hover:shadow-[0_12px_40px_rgba(113,221,174,0.6)] hover:-translate-y-1 hover:scale-105 relative overflow-hidden w-full sm:w-auto self-start disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:-translate-y-0"
                style={{
                  boxShadow: '0 8px 32px rgba(113, 221, 174, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                  color: '#1C1C1C',
                }}
              >
                {/* Effet de brillance sur le bouton */}
                <div 
                  className="absolute inset-0 opacity-50"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%)',
                    animation: 'shimmer 2s infinite',
                  }}
                />
                <span className="relative z-10">
                  {isLoading ? "Inscription..." : "S'abonner"}
                </span>
              </button>
            </div>
          </form>
        </div>
        
        {/* Notification inline sous le formulaire */}
        {notification && (
          <div className="mt-4">
            <Notification
              message={notification.message}
              type={notification.type}
              isVisible={!!notification}
              onClose={() => setNotification(null)}
            />
          </div>
        )}
        
        <p className="text-xs text-white/50 text-center mt-4 max-w-xs sm:max-w-full mx-auto">
          En vous inscrivant, vous acceptez notre{' '}
          <Link href="/politique-de-confidentialite" className="underline hover:text-white/70 transition">
            politique de confidentialité
          </Link>
          .
        </p>
      </div>
      
      {/* Style pour l'animation shimmer */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </section>
  );
}

