"use client";

import { FormEvent } from "react";

export function NewsletterSignup() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    console.info("Newsletter signup", email);
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        required
        placeholder="votre@email.com"
        className="rounded-2xl border border-white/10 bg-[color:rgba(14,22,31,0.65)] px-4 py-3 text-sm text-white outline-none transition focus:border-[color:var(--color-secondary)]"
      />
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-secondary)] px-5 py-3 text-sm font-semibold uppercase text-white"
      >
        Rejoindre la newsletter
      </button>
    </form>
  );
}
