import { articles } from "@/data/articles";
import { articleContent as articleContentData } from "@/data/article-content";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FaCalendarAlt } from "react-icons/fa";

// Contenu détaillé pour chaque article (format pour compatibilité)
const articleContent: Record<string, { content: string }> = Object.fromEntries(
  Object.entries(articleContentData).map(([slug, content]) => [slug, { content }])
);

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const content = articleContent[slug];

  if (!content) {
    notFound();
  }

  // Convertir le markdown simple en HTML (version simplifiée)
  const formatContent = (text: string) => {
    const lines = text.split("\n");
    let inList = false;
    let result: string[] = [];

    lines.forEach((line, index) => {
      const trimmed = line.trim();
      
      // Titres
      if (trimmed.startsWith("# ")) {
        if (inList) {
          result.push("</ul>");
          inList = false;
        }
        result.push(`<h1 class="text-4xl font-bold text-white mb-6 mt-12 first:mt-0">${trimmed.substring(2)}</h1>`);
        return;
      }
      if (trimmed.startsWith("## ")) {
        if (inList) {
          result.push("</ul>");
          inList = false;
        }
        result.push(`<h2 class="text-3xl font-bold text-white mb-4 mt-8">${trimmed.substring(3)}</h2>`);
        return;
      }
      if (trimmed.startsWith("### ")) {
        if (inList) {
          result.push("</ul>");
          inList = false;
        }
        result.push(`<h3 class="text-2xl font-semibold text-white mb-3 mt-6">${trimmed.substring(4)}</h3>`);
        return;
      }
      
      // Liste à puces
      if (trimmed.startsWith("- ")) {
        if (!inList) {
          result.push('<ul class="list-disc list-inside space-y-2 mb-4 text-white/70">');
          inList = true;
        }
        let content = trimmed.substring(2);
        // Gérer le gras dans les listes
        content = content.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>');
        result.push(`<li class="ml-4">${content}</li>`);
        return;
      }
      
      // Fin de liste
      if (inList && trimmed === "") {
        result.push("</ul>");
        inList = false;
        return;
      }
      
      // Paragraphes
      if (trimmed && !trimmed.startsWith("#") && !trimmed.startsWith("-") && !trimmed.startsWith("[")) {
        if (inList) {
          result.push("</ul>");
          inList = false;
        }
        let content = trimmed;
        // Gérer le gras
        content = content.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>');
        result.push(`<p class="text-white/70 mb-4 leading-relaxed">${content}</p>`);
        return;
      }
      
      // Ligne vide
      if (trimmed === "" && inList) {
        result.push("</ul>");
        inList = false;
      }
    });
    
    if (inList) {
      result.push("</ul>");
    }
    
    return result.join("\n");
  };

  return (
    <div className="min-h-screen bg-[color:var(--color-background-strong)]">
      {/* Contenu de l'article */}
      <article className="pt-8 pb-16">
        <div className="mx-auto max-w-6xl px-6">
          {/* En-tête de l'article */}
          <div className="mb-12">
            <div className="mb-6">
              <Link
                href="/guides"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all relative overflow-hidden hover:scale-105 mb-4"
                style={{
                  background: 'linear-gradient(135deg, #FAFAFA 0%, #E6E6E6 25%, #CFCFCF 50%, #B8B8B8 75%, #9E9E9E 100%)',
                  boxShadow: '0 10px 30px rgba(158, 158, 158, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(0, 0, 0, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: '#1C1C1C'
                }}
              >
                {/* Overlay brillant pour effet métallique */}
                <div 
                  className="absolute inset-0 rounded-xl pointer-events-none opacity-30"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, transparent 50%, rgba(0, 0, 0, 0.1) 100%)'
                  }}
                />
                <span className="relative z-10">←</span>
                <span className="relative z-10">Retour aux guides</span>
              </Link>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              {article.title}
            </h1>
            <div className="flex items-center gap-4 text-white/60 text-sm">
              <span>{article.readTime} de lecture</span>
              <span>•</span>
              <span>
                {new Date(article.publishedAt).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* Résumé */}
          <div 
            className="mb-12 p-8 rounded-3xl relative overflow-hidden"
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
            <p className="text-lg text-[#1C1C1C] leading-relaxed font-medium relative z-10">
              {article.summary}
            </p>
          </div>

          {/* Contenu principal */}
          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{
              __html: formatContent(content.content),
            }}
          />

          {/* Call to action */}
          <div 
            className="mt-16 p-8 rounded-3xl text-center relative overflow-hidden"
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
            <h3 className="text-2xl font-bold text-[#1C1C1C] mb-4 relative z-10">
              Prêt à passer à l'action ?
            </h3>
            <p className="text-[#1C1C1C] mb-6 relative z-10">
              Discutons de votre projet et trouvons ensemble la meilleure solution.
            </p>
            <Link
              href="https://calendly.com/webdifference/nouvelle-reunion?hide_gdpr_banner=1&background_color=282828&text_color=ffffff&primary_color=71ddae&month=2025-12"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#1C1C1C] text-white font-extrabold rounded-xl hover:scale-105 transition-transform relative z-10 text-xl"
            >
              <FaCalendarAlt className="text-2xl" />
              Prendre un rendez-vous
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}

