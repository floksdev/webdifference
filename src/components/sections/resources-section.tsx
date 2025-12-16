"use client";

import { useState, KeyboardEvent } from "react";
import Link from "next/link";
import { articles } from "@/data/articles";
import { Notification } from "@/components/ui/notification";

export function ResourcesSection() {
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
    <>
      <section className="border-t border-white/10 pt-8 pb-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6">
          <div className="flex flex-col gap-3 text-center">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl relative top-8">
              Guides &{' '}
              <span 
                className="text-4xl sm:text-5xl font-bold inline-block"
                style={{
                  background: 'linear-gradient(135deg, #FAFAFA 0%, #E6E6E6 25%, #CFCFCF 50%, #B8B8B8 75%, #9E9E9E 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                FAQ
              </span>
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {articles.slice(0, 3).map((post, index) => (
              <article
                key={post.slug}
                className={`group relative flex flex-col rounded-3xl p-8 transition-all duration-300 h-[320px] overflow-hidden ${
                  post.category === "Guide agence" ? "md:mt-12" : ""
                }`}
                style={{
                  background: 'linear-gradient(135deg, #FAFAFA 0%, #E6E6E6 25%, #CFCFCF 50%, #B8B8B8 75%, #9E9E9E 100%)',
                  boxShadow: '0 20px 60px rgba(158, 158, 158, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(0, 0, 0, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.3)'
                }}
              >
                {/* Overlay brillant pour effet métallique */}
                <div 
                  className="absolute inset-0 rounded-3xl pointer-events-none opacity-30"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, transparent 50%, rgba(0, 0, 0, 0.1) 100%)'
                  }}
                />
                
                {/* Header premium avec catégorie */}
                <div className="mb-6 relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-[#1C1C1C] flex items-center justify-center shrink-0 shadow-lg">
                        <span className="text-white text-base font-bold">
                          {post.category.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-xl font-extrabold text-black leading-tight">
                          {post.category}
                        </h3>
                        <p className="text-xs text-black/60 mt-1">
                          {post.readTime} · {new Date(post.publishedAt).toLocaleDateString("fr-FR", {
                            month: "short",
                            day: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contenu */}
                <div className="flex-1 flex flex-col gap-3 relative z-10">
                  <h4 className="text-lg font-bold text-black leading-tight">
                    {post.title}
                  </h4>
                  <p className="text-base text-black/90 leading-relaxed font-medium">
                    {post.summary}
                  </p>
                </div>
              </article>
            ))}
          </div>
          
          {/* Bouton "En voir +" */}
          <div className="flex justify-center mt-8">
            <Link
              href="/guides"
              className="rounded-2xl px-8 py-4 font-bold text-lg transition-all hover:-translate-y-1 hover:scale-105 relative overflow-hidden text-black"
              style={{
                background: 'linear-gradient(135deg, #FAFAFA 0%, #E6E6E6 25%, #CFCFCF 50%, #B8B8B8 75%, #9E9E9E 100%)',
                boxShadow: '0 20px 60px rgba(158, 158, 158, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}
            >
              {/* Overlay brillant pour effet métallique */}
              <div 
                className="absolute inset-0 rounded-2xl pointer-events-none opacity-30"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, transparent 50%, rgba(0, 0, 0, 0.1) 100%)'
                }}
              />
              <span className="relative z-10"><span className="font-extrabold">En voir</span> davantage</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Section Newsletter Premium */}
      <section className="border-t border-white/10 py-24 relative overflow-hidden">
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
        
        <div className="mx-auto flex max-w-5xl flex-col gap-12 px-6 relative z-10">
          {/* Titre premium avec effet métallique */}
          <div className="flex flex-col gap-6 text-center">
            <h2 
              className="text-5xl sm:text-6xl font-extrabold relative"
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
            <p className="text-lg text-white/80 font-medium">
              Recevez nos guides, astuces et actualités directement dans votre boîte mail.
            </p>
          </div>
          
          {/* Formulaire premium dans un conteneur brillant */}
          <div 
            className="relative rounded-3xl p-8 md:p-12"
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
                    className="w-full rounded-2xl border-2 border-white/30 bg-white/10 backdrop-blur-md px-6 py-5 text-white placeholder:text-white/60 focus:outline-none focus:border-[#71DDAE] focus:ring-4 focus:ring-[#71DDAE]/30 focus:bg-white/15 transition-all text-lg font-medium shadow-[0_8px_32px_rgba(0,0,0,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.2), 0 0 20px rgba(113, 221, 174, 0.1)',
                    }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="rounded-2xl bg-gradient-to-r from-[#71DDAE] via-[#5BCA9D] to-[#2A9D7A] px-10 py-5 font-bold text-2xl transition-all shadow-[0_8px_32px_rgba(113,221,174,0.4)] hover:shadow-[0_12px_40px_rgba(113,221,174,0.6)] hover:-translate-y-1 hover:scale-105 relative overflow-hidden self-start disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:-translate-y-0"
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
          
          <p className="text-xs text-white/50 text-center mt-4">
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
    </>
  );
}
