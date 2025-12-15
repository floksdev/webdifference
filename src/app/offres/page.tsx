import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nos offres - Web Difference",
  description: "Bientôt disponible",
};

export default function OffersPage() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col items-center justify-center px-6 py-24">
      <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
        Bientôt disponible
      </h1>
    </section>
  );
}
