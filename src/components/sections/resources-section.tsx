"use client";

import Link from "next/link";
import { articles } from "@/data/articles";
import { FaArrowRight } from "react-icons/fa";

export function ResourcesSection() {

  return (
    <>
      <section className="border-t border-white/10 pt-8 pb-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:gap-8 px-6">
          <div className="flex flex-col gap-3 text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white md:text-4xl relative top-4 sm:top-8">
              Guides &{' '}
              <span 
                className="text-3xl sm:text-4xl md:text-5xl font-bold inline-block"
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
        <div className="grid gap-4 sm:gap-6 md:grid-cols-3 mt-4 sm:mt-0">
            {articles.slice(0, 3).map((post, index) => (
              <Link
              key={post.slug}
                href={`/guides/${post.slug}`}
                className={`group relative flex flex-col rounded-3xl p-4 sm:p-6 md:p-8 transition-all duration-300 min-h-[280px] sm:h-[320px] overflow-hidden hover:scale-105 hover:shadow-2xl ${
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
                <div className="mb-4 sm:mb-6 relative z-10">
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-[#1C1C1C] flex items-center justify-center shrink-0 shadow-lg">
                        <span className="text-white text-sm sm:text-base font-bold">
                          {post.category.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex flex-col min-w-0 flex-1">
                        <h3 className="text-base sm:text-xl font-extrabold text-black leading-tight truncate">
                {post.category}
                        </h3>
                        <p className="text-[10px] sm:text-xs text-black/60 mt-1">
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
                <div className="flex-1 flex flex-col gap-2 sm:gap-3 relative z-10">
                  <h4 className="text-base sm:text-lg font-bold text-black leading-tight line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="text-sm sm:text-base text-black/90 leading-relaxed font-medium line-clamp-3">
                    {post.summary}
                  </p>
                </div>
              </Link>
          ))}
        </div>
          
          {/* Bouton "En voir +" */}
          <div className="flex justify-center mt-6 sm:mt-8">
          <Link
              href="/guides"
              className="rounded-2xl px-6 py-3 sm:px-8 sm:py-4 font-bold text-base sm:text-lg transition-all hover:-translate-y-1 hover:scale-105 relative overflow-hidden text-black"
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
              <span className="relative z-10 flex items-center gap-2">
                Voir tous les guides
                <FaArrowRight className="text-sm" />
              </span>
          </Link>
        </div>
      </div>
    </section>
    </>
  );
}
