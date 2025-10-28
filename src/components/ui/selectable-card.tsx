"use client";

import { cn } from "@/lib/utils";
import type { PropsWithChildren, ReactNode } from "react";

type SelectableCardProps = PropsWithChildren<{
  active?: boolean;
  onClick?: () => void;
  description?: ReactNode;
  badge?: string;
  disabled?: boolean;
}>;

export function SelectableCard({
  active,
  onClick,
  children,
  description,
  badge,
  disabled,
}: SelectableCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "group relative flex h-full w-full flex-col gap-2 rounded-3xl border p-5 text-left transition",
        "border-white/10 bg-[color:var(--color-surface)]/80 hover:border-[color:var(--color-secondary)]/60 hover:shadow-lg hover:shadow-[rgba(0,224,255,0.15)]",
        active
          ? "border-[color:var(--color-secondary)]/90 shadow-[0_0_0_1px_rgba(0,224,255,0.2)]"
          : "border-white/10",
        disabled && "cursor-not-allowed opacity-50",
      )}
    >
      {badge ? (
        <span className="inline-flex w-fit rounded-full bg-[color:rgba(0,224,255,0.12)] px-3 py-1 text-xs font-semibold text-white/80">
          {badge}
        </span>
      ) : null}
      <span className="text-base font-semibold text-white">{children}</span>
      {description ? (
        <span className="text-sm text-white/70">{description}</span>
      ) : null}
    </button>
  );
}
