import { type ReactNode } from "react";

export function ChartTooltip({
  active,
  payload,
  label,
  unit = "",
  formatter,
}: {
  active?: boolean;
  payload?: any[];
  label?: string | number;
  unit?: string;
  formatter?: (v: number) => string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  const fmt = formatter ?? ((v: number) => v.toLocaleString(undefined, { maximumFractionDigits: 1 }));
  return (
    <div className="rounded-md border border-border bg-popover/95 px-3 py-2 text-sm shadow-xl backdrop-blur">
      {label !== undefined && (
        <div className="mb-1 font-display text-xs uppercase tracking-wider text-muted-foreground">
          {label}
        </div>
      )}
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: p.color }} />
          <span className="text-muted-foreground">{p.name}:</span>
          <span className="font-semibold tabular-nums text-foreground">
            {fmt(p.value)}
            {unit}
          </span>
        </div>
      ))}
    </div>
  );
}

export function ChartFrame({
  title,
  subtitle,
  source,
  children,
  legend,
}: {
  title: string;
  subtitle?: string;
  source?: string;
  legend?: ReactNode;
  children: ReactNode;
}) {
  return (
    <figure className="my-10 rounded-xl border border-border bg-card/60 p-5 shadow-2xl sm:p-7">
      <figcaption className="mb-1">
        <h4 className="font-display text-xl font-semibold leading-tight text-foreground sm:text-2xl">
          {title}
        </h4>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </figcaption>
      {legend && <div className="mb-3 mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">{legend}</div>}
      <div className="mt-4">{children}</div>
      {source && (
        <p className="mt-4 border-t border-border/60 pt-3 text-xs text-muted-foreground">
          {source}
        </p>
      )}
    </figure>
  );
}

export function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-2 text-muted-foreground">
      <span className="inline-block h-3 w-3 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}

export const CHART = {
  vax: "oklch(0.78 0.12 200)",
  unvax: "oklch(0.64 0.21 25)",
  gold: "oklch(0.82 0.14 85)",
  grid: "oklch(0.3 0.014 250)",
  axis: "oklch(0.68 0.012 250)",
};
