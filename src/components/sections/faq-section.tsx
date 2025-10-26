import { faqItems } from "@/data/faq";

export function FaqSection() {
  return (
    <section className="border-t border-white/10 bg-[color:var(--color-background-strong)] py-24">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6">
        <div className="flex flex-col gap-4 text-center">
          <h2 className="text-3xl font-semibold sm:text-4xl">
            Questions fréquentes
          </h2>
          <p className="text-base text-white/70">
            Des réponses simples pour vous aider à décider en toute confiance.
          </p>
        </div>
        <div className="space-y-4">
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="group rounded-3xl border border-white/10 bg-[color:var(--color-surface)]/85 p-5"
            >
              <summary className="cursor-pointer text-left text-lg font-semibold text-white outline-none marker:hidden">
                {item.question}
              </summary>
              <p className="mt-3 text-sm text-white/70">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
