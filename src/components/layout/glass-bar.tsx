"use client";

export function GlassBar({
  children,
  className = "",
  position = "top",
}: {
  children: React.ReactNode;
  className?: string;
  position?: "top" | "bottom";
}) {
  const pos =
    position === "top"
      ? "sticky top-0 safe-top"
      : "sticky bottom-0 safe-bottom";

  return (
    <div
      className={[
        pos,
        "z-50",
        // Le "matériau" Liquid Glass avec fond vert solide
        // Réduit le blur pour améliorer les performances au scroll
        "backdrop-blur-md backdrop-saturate-150",
        "bg-[#71DDAE]",
        // Hairline + highlight
        position === "top"
          ? "border-b border-slate-900/10"
          : "border-t border-white/15",
        className,
      ].join(" ")}
      style={{
        // Optimisations pour le scroll fluide (sans contain qui peut cacher les enfants)
        willChange: "transform",
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      {children}
    </div>
  );
}

