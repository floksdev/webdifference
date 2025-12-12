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
                ? "border-[color:var(--color-secondary)]/90 bg-[color:rgba(113,221,174,0.08)] text-[#1C1C1C]"
                : completed
                  ? "border-[color:var(--color-secondary)]/40 bg-[color:var(--color-surface)] text-[#1C1C1C]"
                  : "border-[#1C1C1C]/10 bg-[color:var(--color-surface)]/70 text-[#1C1C1C]/70",
            )}
          >
            <p className="text-sm font-semibold">
              {String(index + 1).padStart(2, "0")}
            </p>
            <p className="mt-2 text-sm font-semibold">{step.title}</p>
            <p className="mt-1 text-xs text-[#1C1C1C]/70">{step.description}</p>
          </li>
        );
      })}
    </ol>
  );
}
