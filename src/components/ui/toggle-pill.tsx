"use client";

import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";

type TogglePillProps = PropsWithChildren<{
  active?: boolean;
  onClick?: () => void;
  icon?: string;
}>;

export function TogglePill({ active, onClick, icon, children }: TogglePillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition",
        active
          ? "border-[color:var(--color-secondary)]/80 bg-[color:var(--color-secondary)]/15 text-white"
          : "border-white/15 bg-[color:var(--color-surface)]/60 text-white/75 hover:border-[color:var(--color-secondary)]/50",
      )}
    >
      {icon ? <span>{icon}</span> : null}
      <span>{children}</span>
    </button>
  );
}
