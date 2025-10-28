import Link from "next/link";
import { articles } from "@/data/articles";

export function ResourcesSection() {
  return (
    <section className="border-t border-white/10 bg-[color:var(--color-background-strong)] py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6">
        <div className="flex flex-col gap-4 text-center">
          <h2 className="text-3xl font-semibold sm:text-4xl">Guides & FAQ</h2>
          <p className="text-base text-white/70">
            Des mini-guides pour connaître les budgets, les délais et le bon plan
            avant de lancer votre projet web.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {articles.slice(0, 3).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-[color:var(--color-surface)]/85 p-6 transition hover:border-[color:var(--color-secondary)] hover:text-white"
            >
              <span className="inline-flex w-fit rounded-full bg-[color:rgba(0,224,255,0.15)] px-3 py-1 text-xs font-semibold text-white/70">
                {post.category}
              </span>
              <h3 className="text-lg font-semibold text-white">{post.title}</h3>
              <p className="text-xs text-white/50">
                {post.readTime} · {new Date(post.publishedAt).toLocaleDateString("fr-FR", {
                  month: "short",
                  day: "2-digit",
                })}
              </p>
              <p className="text-sm text-white/60">Lire l&apos;article →</p>
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-white/70">
          <Link
            href="/blog"
            className="inline-flex items-center rounded-full border border-white/20 px-5 py-3 transition hover:border-[color:var(--color-secondary)] hover:text-white"
          >
            Accéder au blog
          </Link>
          <Link
            href="/ressources/newsletter"
            className="inline-flex items-center rounded-full bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-secondary)] px-5 py-3 transition hover:shadow-lg hover:shadow-[rgba(0,224,255,0.25)]"
          >
            S&apos;abonner à la newsletter
          </Link>
        </div>
      </div>
    </section>
  );
}
