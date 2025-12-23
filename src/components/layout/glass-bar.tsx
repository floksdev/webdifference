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
      ? "fixed top-0 left-0 right-0 safe-top"
      : "fixed bottom-0 left-0 right-0 safe-bottom";

  return (
    <div
      className={[
        pos,
        "z-50",
        // Fond vert solide sans blur pour performance maximale
        "bg-[#71DDAE]",
        // Hairline + highlight
        position === "top"
          ? "border-b border-slate-900/10"
          : "border-t border-white/15",
        className,
      ].join(" ")}
      style={{
        // Optimisations maximales pour scroll fluide sur mobile
        willChange: "auto",
        transform: "translate3d(0, 0, 0)",
        WebkitTransform: "translate3d(0, 0, 0)",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        perspective: "1000px",
        WebkitPerspective: "1000px",
        // Force le GPU et évite les reflows
        isolation: "isolate",
      }}
    >
      {children}
    </div>
  );
}

