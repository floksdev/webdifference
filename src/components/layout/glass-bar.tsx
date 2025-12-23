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
        "backdrop-blur-xl backdrop-saturate-150",
        "bg-[#71DDAE]",
        // Hairline + highlight
        position === "top"
          ? "border-b border-slate-900/10"
          : "border-t border-white/15",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

