import type { Metadata } from "next";
import Link from "next/link";
import { NewsletterSignup } from "./newsletter-signup";
import { articles } from "@/data/articles";
import { events } from "@/data/events";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog & ressources Web Difference",
  description:
    "Articles, frameworks, checklists et replays pour créer des expériences digitales différenciantes et automatiser votre delivery.",
};

export default function BlogPage() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-24">
      <header className="space-y-6">
        <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/70">
          Blog & ressources
        </div>
        <h1 className="text-3xl font-semibold sm:text-4xl md:text-5xl">
          Guides pour différencier votre produit & automatiser votre delivery
        </h1>
        <p className="max-w-3xl text-base text-white/70 md:text-lg">
          Articles, frameworks, checklists, replays et newsletter pour lancer des
          expériences mémorables, automatiser vos ops et scaler la croissance.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        {articles.map((article) => (
          <article
            key={article.slug}
            className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-[color:var(--color-surface)]/80 p-6 transition hover:border-[color:var(--color-secondary)]/60 hover:shadow-lg hover:shadow-[rgba(0,224,255,0.12)]"
          >
            <span className="inline-flex w-fit rounded-full bg-[color:rgba(0,224,255,0.15)] px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/70">
              {article.category}
            </span>
            <h2 className="text-lg font-semibold text-white">{article.title}</h2>
            <p className="text-sm text-white/70">{article.summary}</p>
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/50">
              <span>{article.readTime}</span>
              <span>{formatDate(article.publishedAt)}</span>
            </div>
            <Link
              href={`/blog/${article.slug}`}
              className="mt-auto inline-flex text-xs font-semibold uppercase text-[color:var(--color-secondary)]"
            >
              Lire l&apos;article →
            </Link>
          </article>
        ))}
      </section>

      <section className="grid gap-10 rounded-3xl border border-white/10 bg-[color:var(--color-surface)]/70 p-6 md:grid-cols-[1fr_1fr]">
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-white">
            Newsletter différenciation digitale
          </h2>
          <p className="text-sm text-white/70">
            1 email chaque jeudi : études de cas, checklists automation, prompts
            IA, résultats de tests UX et frameworks de scrollytelling.
          </p>
          <NewsletterSignup />
        </div>
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">
            Lives & replays
          </h3>
          <ul className="space-y-3 text-sm text-white/70">
            {events.map((event) => (
              <li key={event.slug} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                  {event.type} · {formatDate(event.scheduledAt)}
                </p>
                <p className="mt-1 font-semibold text-white">{event.name}</p>
                <p className="mt-1 text-xs text-white/60">{event.description}</p>
                <Link
                  href={event.ctaHref}
                  className="mt-2 inline-flex text-xs font-semibold uppercase text-[color:var(--color-secondary)]"
                >
                  {event.ctaLabel} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-[color:var(--color-surface)]/70 p-6">
        <h2 className="text-xl font-semibold text-white">
          Ressources téléchargeables
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <Link
            href="/ressources/checklist-automation.pdf"
            className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70 transition hover:border-[color:var(--color-secondary)]/60 hover:text-white"
          >
            ✅ Checklist automation SaaS (12 points)
          </Link>
          <Link
            href="/ressources/framework-scrollytelling.pdf"
            className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70 transition hover:border-[color:var(--color-secondary)]/60 hover:text-white"
          >
            🎬 Framework scrollytelling différenciant
          </Link>
          <Link
            href="/ressources/template-dashboard.notion"
            className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70 transition hover:border-[color:var(--color-secondary)]/60 hover:text-white"
          >
            📊 Template dashboard Notion (Growth Ops)
          </Link>
        </div>
      </section>
    </section>
  );
}
