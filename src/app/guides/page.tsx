"use client";

import { articles } from "@/data/articles";
import { articleContent } from "@/data/article-content";
import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";

const categories = ["Tous", ...Array.from(new Set(articles.map((a) => a.category)))];

// Normaliser une chaîne (enlever accents, minuscules)
const normalize = (str: string): string => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, "");
};

// Calculer la similarité entre deux chaînes (0-1)
const similarity = (str1: string, str2: string): number => {
  const s1 = normalize(str1);
  const s2 = normalize(str2);

  // Correspondance exacte
  if (s1 === s2) return 1;

  // Correspondance partielle (l'un contient l'autre)
  if (s1.includes(s2) || s2.includes(s1)) {
    return Math.max(s1.length, s2.length) / Math.min(s1.length, s2.length) * 0.8;
  }

  // Distance de Levenshtein simplifiée
  const longer = s1.length > s2.length ? s1 : s2;
  const shorter = s1.length > s2.length ? s2 : s1;
  
  if (longer.length === 0) return 1;

  // Calculer le nombre de caractères communs dans l'ordre
  let matches = 0;
  let j = 0;
  for (let i = 0; i < shorter.length && j < longer.length; i++) {
    if (shorter[i] === longer[j]) {
      matches++;
      j++;
    } else {
      // Chercher le caractère plus loin
      const found = longer.indexOf(shorter[i], j);
      if (found !== -1) {
        matches++;
        j = found + 1;
      }
    }
  }

  // Tolérance : si au moins 70% des caractères correspondent
  const similarityScore = matches / longer.length;
  return similarityScore >= 0.7 ? similarityScore : 0;
};

// Vérifier si la requête correspond au texte avec tolérance
const fuzzyMatch = (query: string, text: string, threshold: number = 0.6): boolean => {
  if (!query.trim()) return true;

  const normalizedQuery = normalize(query);
  const normalizedText = normalize(text);

  // Correspondance exacte
  if (normalizedText.includes(normalizedQuery)) return true;

  // Mots individuels de la requête
  const queryWords = normalizedQuery.split(/\s+/).filter((w) => w.length > 2);
  if (queryWords.length > 0) {
    const allWordsMatch = queryWords.every((word) => {
      // Correspondance exacte du mot
      if (normalizedText.includes(word)) return true;
      
      // Correspondance fuzzy du mot
      const words = normalizedText.split(/\s+/);
      return words.some((textWord) => similarity(word, textWord) >= threshold);
    });
    if (allWordsMatch) return true;
  }

  // Similarité globale
  return similarity(normalizedQuery, normalizedText) >= threshold;
};

export default function GuidesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) {
      return articles.filter(
        (article) => selectedCategory === "Tous" || article.category === selectedCategory
      );
    }

    // Recherche avec priorité : titre > description > contenu > tags
    const articlesWithScore = articles.map((article) => {
      let score = 0;
      let matchType: "title" | "summary" | "content" | "tags" | "none" = "none";

      // Vérifier d'abord les correspondances exactes dans le titre
      const normalizedTitle = normalize(article.title);
      const normalizedQuery = normalize(searchQuery);
      
      // Priorité 1 : Correspondance exacte dans le titre (score très élevé)
      if (normalizedTitle.includes(normalizedQuery)) {
        score = 100;
        matchType = "title";
      }
      // Priorité 2 : Correspondance fuzzy dans le titre (score élevé)
      else if (fuzzyMatch(searchQuery, article.title, 0.7)) {
        score = 90;
        matchType = "title";
      }
      // Priorité 3 : Correspondance exacte dans la description
      else if (normalize(article.summary).includes(normalizedQuery)) {
        score = 50;
        matchType = "summary";
      }
      // Priorité 4 : Correspondance fuzzy dans la description
      else if (fuzzyMatch(searchQuery, article.summary, 0.7)) {
        score = 40;
        matchType = "summary";
      }
      // Priorité 5 : Tags (seulement si correspondance exacte ou très proche)
      else if (article.tags.some((tag) => {
        const normalizedTag = normalize(tag);
        return normalizedTag.includes(normalizedQuery) || fuzzyMatch(searchQuery, tag, 0.8);
      })) {
        score = 30;
        matchType = "tags";
      }
      // Priorité 6 : Contenu (seulement si la requête fait plus de 4 caractères et correspondance très stricte)
      else if (
        searchQuery.trim().length > 4 &&
        articleContent[article.slug] &&
        fuzzyMatch(searchQuery, articleContent[article.slug], 0.75)
      ) {
        score = 20;
        matchType = "content";
      }

      return { article, score, matchType };
    });

    // Filtrer et trier par score
    return articlesWithScore
      .filter(
        (item) =>
          item.score > 0 &&
          (selectedCategory === "Tous" || item.article.category === selectedCategory)
      )
      .sort((a, b) => b.score - a.score)
      .map((item) => item.article);
  }, [searchQuery, selectedCategory]);

  return (
    <section className="border-t border-white/10 pt-8 pb-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6">
        {/* Image */}
        <div className="flex justify-center mt-8 mb-4">
          <Image
            src="/guide2.png"
            alt="Guides"
            width={120}
            height={60}
            className="w-auto h-auto rounded-2xl max-w-[80px] sm:max-w-none"
          />
        </div>
        
        {/* Titre */}
        <div className="flex flex-col gap-3 text-center mb-1 sm:mb-4">
          <h2 className="text-4xl sm:text-5xl font-bold">
            <span 
              className="inline-block"
              style={{
                background: 'linear-gradient(135deg, #FAFAFA 0%, #E6E6E6 25%, #CFCFCF 50%, #B8B8B8 75%, #9E9E9E 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Guides & FAQ
            </span>
          </h2>
        </div>

        {/* Barre de recherche avec style dégradé argenté */}
        <div className="w-full mb-1 flex justify-center">
          <div className="relative max-w-2xl w-full">
            {/* Icône logo de recherche */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
              <Image
                src="/assets/main/fond-blanc/logo-sm.png"
                alt="Recherche"
                width={32}
                height={32}
                className="h-8 w-8 opacity-70"
              />
            </div>
            <input
              type="text"
              placeholder="Rechercher un guide, un sujet, une question..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-16 pr-6 py-4 rounded-3xl text-black placeholder:text-black/50 focus:outline-none transition-all text-sm sm:text-lg font-medium relative"
              style={{
                background: 'linear-gradient(135deg, #FAFAFA 0%, #E6E6E6 25%, #CFCFCF 50%, #B8B8B8 75%, #9E9E9E 100%)',
                boxShadow: '0 20px 60px rgba(158, 158, 158, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.3)'
              }}
            />
            {/* Overlay brillant pour effet métallique */}
            <div 
              className="absolute inset-0 rounded-3xl pointer-events-none opacity-30"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, transparent 50%, rgba(0, 0, 0, 0.1) 100%)'
              }}
            />
          </div>
        </div>

        {/* Filtres par catégorie */}
        <div className="flex flex-wrap justify-center gap-3 w-full mb-8 mt-1">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className="px-6 py-2 rounded-xl text-sm font-semibold transition-all relative overflow-hidden"
              style={{
                background: selectedCategory === category
                  ? 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 25%, #E8E8E8 50%, #DBDBDB 75%, #CFCFCF 100%)'
                  : 'linear-gradient(135deg, #FAFAFA 0%, #E6E6E6 25%, #CFCFCF 50%, #B8B8B8 75%, #9E9E9E 100%)',
                boxShadow: '0 10px 30px rgba(158, 158, 158, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: '#1C1C1C',
                opacity: selectedCategory === category ? 1 : 0.7
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.opacity = '0.85';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.opacity = '0.7';
                }
              }}
            >
              {/* Overlay brillant pour effet métallique */}
              <div 
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{
                  opacity: selectedCategory === category ? 0.4 : 0.3,
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, transparent 50%, rgba(0, 0, 0, 0.1) 100%)'
                }}
              />
              <span className="relative z-10">{category}</span>
            </button>
          ))}
        </div>

        {/* Message si aucun résultat */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-white/60 mb-4">Aucun guide trouvé</p>
            <p className="text-white/40">
              Essayez de modifier votre recherche ou de changer de catégorie
            </p>
          </div>
        ) : (
          <>
            {/* Grille d'articles */}
            <div className="grid gap-6 md:grid-cols-3">
              {filteredArticles.map((post) => (
                <Link
                  key={post.slug}
                  href={`/guides/${post.slug}`}
                  className="group relative flex flex-col rounded-3xl p-8 transition-all duration-300 h-[320px] overflow-hidden hover:scale-105 hover:shadow-2xl"
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
                </Link>
              ))}
            </div>
          </>
        )}

        {/* Message "Plus à venir" */}
        <div className="mt-16 text-center">
          <div 
            className="inline-block px-8 py-4 rounded-2xl relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #FAFAFA 0%, #E6E6E6 25%, #CFCFCF 50%, #B8B8B8 75%, #9E9E9E 100%)',
              boxShadow: '0 20px 60px rgba(158, 158, 158, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}
          >
            {/* Overlay brillant pour effet métallique */}
            <div 
              className="absolute inset-0 rounded-2xl pointer-events-none opacity-30"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, transparent 50%, rgba(0, 0, 0, 0.1) 100%)'
              }}
            />
            <p className="text-base sm:text-lg text-[#1C1C1C] font-semibold relative z-10">
              <span className="font-bold">Nouveau guide chaque semaine</span>
              <span className="mx-2">·</span>
              <span className="text-[#1C1C1C]/70">D'autres contenus arrivent bientôt</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
