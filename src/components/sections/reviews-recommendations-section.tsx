'use client';

import { useEffect, useMemo, useState } from 'react';

type Review = {
  id: string;
  title: string;
  author: string;
  content: string;
  rating: number;
  start: string;
  end: string;
  budget: string;
};

type Recommendation = {
  id: string;
  author: string;
  content: string;
  date: string;
  thumbs: number;
};

const reviews: Review[] = [
  {
    id: 'review-1',
    title: 'Pdf en excel selon modèle et envoi sur FTP',
    author: 'Évalué le 31 oct. 2025 · vendeur921',
    content:
      'Excellent développeur, compétent, réactif et disponible. Vous pouvez lui faire confiance.',
    rating: 5,
    start: 'Début : Oct. 2025',
    end: 'Fin : Nov. 2025',
    budget: 'Budget : 490 €',
  },
  {
    id: 'review-2',
    title: 'Business manager meta',
    author: 'Évalué le 31 oct. 2025 · eadd59c00',
    content:
      'Top, je le recommande pour son professionnalisme et son expertise. Merci pour tout.',
    rating: 5,
    start: 'Début : Oct. 2025',
    end: 'Fin : Nov. 2025',
    budget: 'Budget : 97 €',
  },
  {
    id: 'review-3',
    title: 'Aide pour récupérer une page Instagram',
    author: 'Évalué le 24 oct. 2025 · p23529698',
    content: 'Prestataire très disponible.',
    rating: 5,
    start: 'Début : Oct. 2025',
    end: 'Fin : Nov. 2025',
    budget: 'Budget : 150 €',
  },
  {
    id: 'review-4',
    title: 'Retouche photo par IA',
    author: 'Évalué le 15 oct. 2025 · Jérémy Gaultier',
    content: 'Très bon travail.',
    rating: 5,
    start: 'Début : Oct. 2025',
    end: 'Fin : Oct. 2025',
    budget: 'Budget : 35 €',
  },
];

const recommendations: Recommendation[] = [
  {
    id: 'rec-1',
    author: 'Corinne · Verdi events',
    date: 'Recommandé le 23 oct. 2025',
    content:
      "Site e-commerce complet, référencement au top, automatisations adaptées. Professionnalisme et vitesse d'exécution impeccables.",
    thumbs: 5,
  },
  {
    id: 'rec-2',
    author: 'Jodie · JWL Marketing',
    date: 'Recommandé le 22 oct. 2025',
    content:
      "Tristan comprend vite les enjeux, imagine des solutions et livre un résultat impeccable. Collaboration fluide et efficace.",
    thumbs: 5,
  },
  {
    id: 'rec-3',
    author: 'Noah Descaves',
    date: 'Recommandé le 17 oct. 2025',
    content:
      'Écoute, pédagogie, pistes pertinentes et exécution soignée. Travaux livrés dans les temps avec un vrai souci du détail.',
    thumbs: 5,
  },
];

const REVIEW_CHUNK_SIZE = 2;
const RECO_CHUNK_SIZE = 2;

function chunk<T>(list: T[], size: number) {
  const result: T[][] = [];
  for (let i = 0; i < list.length; i += size) {
    result.push(list.slice(i, i + size));
  }
  return result;
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: count }).map((_, idx) => (
        <span
          key={idx}
          className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500 text-xs font-semibold text-white shadow-[0_4px_10px_rgba(16,185,129,0.45)]"
        >
          ★
        </span>
      ))}
    </div>
  );
}

function Thumbs({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: count }).map((_, idx) => (
        <span
          key={idx}
          className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-blue-600 text-xs font-semibold text-white shadow-[0_4px_10px_rgba(37,99,235,0.4)]"
        >
          👍
        </span>
      ))}
    </div>
  );
}

export default function ReviewsRecommendationsSection() {
  const reviewSlides = useMemo(() => chunk(reviews, REVIEW_CHUNK_SIZE), []);
  const recommendationSlides = useMemo(
    () => chunk(recommendations, RECO_CHUNK_SIZE),
    [],
  );

  const [activeReview, setActiveReview] = useState(0);
  const [activeReco, setActiveReco] = useState(0);

  useEffect(() => {
    if (reviewSlides.length <= 1) return;
    const id = setInterval(
      () => setActiveReview((prev) => (prev + 1) % reviewSlides.length),
      6000,
    );
    return () => clearInterval(id);
  }, [reviewSlides.length]);

  useEffect(() => {
    if (recommendationSlides.length <= 1) return;
    const id = setInterval(
      () => setActiveReco((prev) => (prev + 1) % recommendationSlides.length),
      6500,
    );
    return () => clearInterval(id);
  }, [recommendationSlides.length]);

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20">
      <header className="flex flex-col gap-3 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[color:var(--color-secondary)]/85">
          Preuves sociales
        </p>
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">
          Avis & recommandations vérifiés
        </h2>
        <p className="mx-auto max-w-2xl text-sm text-white/70">
          Extraits d’évaluations et de recommandations laissées par les clients. Une
          vue concrète sur la qualité, la réactivité et la pédagogie apportées à chaque projet.
        </p>
      </header>

      <div className="mt-14 flex flex-col gap-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_-45px_rgba(8,20,42,0.55)]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h3 className="text-lg font-semibold text-white">Avis projets freelances</h3>
            <span className="text-xs uppercase tracking-[0.3em] text-white/50">
              {reviews.length} évaluations
            </span>
          </div>
          <div className="relative mt-6 overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${activeReview * 100}%)` }}
            >
              {reviewSlides.map((slide, slideIndex) => (
                <div
                  key={`reviews-${slideIndex}`}
                  className="grid min-w-full gap-4 md:grid-cols-2"
                >
                  {slide.map((review) => (
                    <article
                      key={review.id}
                      className="flex h-full flex-col gap-4 rounded-[24px] border border-slate-200 bg-white p-6 text-left shadow-[0_20px_50px_-35px_rgba(15,23,42,0.45)]"
                    >
                      <Stars count={review.rating} />
                      <div className="space-y-1">
                        <h4 className="text-base font-semibold text-slate-900">
                          {review.title}
                        </h4>
                        <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                          {review.author}
                        </p>
                      </div>
                      <p className="text-sm leading-relaxed text-slate-700">
                        “{review.content}”
                      </p>
                      <div className="mt-auto flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.2em] text-slate-500">
                        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                          {review.start}
                        </span>
                        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                          {review.end}
                        </span>
                        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                          {review.budget}
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              ))}
            </div>
            {reviewSlides.length > 1 && (
              <div className="mt-6 flex justify-center gap-2">
                {reviewSlides.map((_, idx) => (
                  <button
                    key={`dot-review-${idx}`}
                    type="button"
                    aria-label={`Afficher les avis ${idx + 1}`}
                    onClick={() => setActiveReview(idx)}
                    className={`h-2 w-10 rounded-full transition ${
                      idx === activeReview
                        ? 'bg-[color:var(--color-secondary)]'
                        : 'bg-white/30 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_-45px_rgba(8,20,42,0.55)]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h3 className="text-lg font-semibold text-white">Recommandations détaillées</h3>
            <span className="text-xs uppercase tracking-[0.3em] text-white/50">
              {recommendations.length} recommandations
            </span>
          </div>
          <div className="relative mt-6 overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${activeReco * 100}%)` }}
            >
              {recommendationSlides.map((slide, slideIndex) => (
                <div
                  key={`reco-${slideIndex}`}
                  className="grid min-w-full gap-4 md:grid-cols-2"
                >
                  {slide.map((rec) => (
                    <article
                      key={rec.id}
                      className="flex h-full flex-col gap-4 rounded-[24px] border border-slate-200 bg-white p-6 text-left shadow-[0_20px_50px_-35px_rgba(15,23,42,0.4)]"
                    >
                      <Thumbs count={rec.thumbs} />
                      <div className="space-y-1">
                        <h4 className="text-base font-semibold text-slate-900">
                          {rec.date}
                        </h4>
                        <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                          {rec.author}
                        </p>
                      </div>
                      <p className="text-sm leading-relaxed text-slate-700">
                        “{rec.content}”
                      </p>
                      <span className="mt-auto inline-flex w-fit items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-blue-700">
                        Publiée
                      </span>
                    </article>
                  ))}
                </div>
              ))}
            </div>
            {recommendationSlides.length > 1 && (
              <div className="mt-6 flex justify-center gap-2">
                {recommendationSlides.map((_, idx) => (
                  <button
                    key={`dot-reco-${idx}`}
                    type="button"
                    aria-label={`Afficher les recommandations ${idx + 1}`}
                    onClick={() => setActiveReco(idx)}
                    className={`h-2 w-10 rounded-full transition ${
                      idx === activeReco
                        ? 'bg-[color:var(--color-secondary)]'
                        : 'bg-white/30 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

