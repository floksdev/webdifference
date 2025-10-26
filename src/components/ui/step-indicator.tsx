import { cn } from "@/lib/utils";

type StepIndicatorProps = {
  steps: Array<{ title: string; description: string }>;
  current: number;
};

export function StepIndicator({ steps, current }: StepIndicatorProps) {
  return (
    <ol className="grid gap-3 md:grid-cols-4">
      {steps.map((step, index) => {
        const active = index === current;
        const completed = index < current;
        return (
          <li
            key={step.title}
            className={cn(
              "rounded-3xl border px-4 py-3 transition",
              active
                ? "border-[color:var(--color-secondary)]/90 bg-[color:rgba(0,224,255,0.08)] text-white"
                : completed
                  ? "border-[color:var(--color-secondary)]/40 bg-[color:var(--color-surface)] text-white"
                  : "border-white/10 bg-[color:var(--color-surface)]/70 text-white/70",
            )}
          >
            <p className="text-xs uppercase tracking-[0.3em]">
              {String(index + 1).padStart(2, "0")}
            </p>
            <p className="mt-2 text-sm font-semibold">{step.title}</p>
            <p className="mt-1 text-xs text-white/65">{step.description}</p>
          </li>
        );
      })}
    </ol>
  );
}
