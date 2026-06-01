import { motion } from "framer-motion";
import { type ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="font-display text-sm font-semibold tabular-nums text-gold">{index}</span>
      <span className="h-px w-8 bg-border" />
      <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        {children}
      </span>
    </div>
  );
}

export function Stat({
  value,
  label,
  tone = "neutral",
}: {
  value: string;
  label: string;
  tone?: "vax" | "unvax" | "neutral";
}) {
  const color =
    tone === "unvax" ? "text-unvax" : tone === "vax" ? "text-vax" : "text-gold";
  return (
    <div className="rounded-lg border border-border bg-card/50 p-5">
      <div className={`font-display text-4xl font-semibold tabular-nums sm:text-5xl ${color}`}>
        {value}
      </div>
      <div className="mt-2 text-sm leading-snug text-muted-foreground">{label}</div>
    </div>
  );
}

export function PullQuote({ children, cite }: { children: ReactNode; cite?: string }) {
  return (
    <blockquote className="my-10 border-l-2 border-gold pl-6">
      <p className="font-display text-2xl font-medium italic leading-snug text-foreground sm:text-3xl">
        {children}
      </p>
      {cite && <cite className="mt-3 block text-sm not-italic text-muted-foreground">— {cite}</cite>}
    </blockquote>
  );
}

export function TimelineEvent({
  date,
  title,
  children,
}: {
  date: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <Reveal className="relative pl-8">
      <span className="absolute left-0 top-1.5 h-3 w-3 rounded-full border-2 border-gold bg-background" />
      <span className="absolute left-[5px] top-5 h-[calc(100%+1.5rem)] w-px bg-border" />
      <div className="text-xs font-semibold uppercase tracking-widest text-gold">{date}</div>
      <h4 className="mt-1 font-display text-xl font-semibold text-foreground">{title}</h4>
      <p className="mt-1 text-[1.05rem] leading-relaxed text-muted-foreground">{children}</p>
    </Reveal>
  );
}
