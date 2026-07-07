import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/* Small monospace eyebrow / registration label used across the site. */
export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-primary',
        className,
      )}
    >
      <span className="h-px w-6 bg-primary/60" aria-hidden="true" />
      {children}
    </span>
  );
}

/* Section wrapper with consistent vertical rhythm + max width. */
export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn('border-t border-border/60 py-16 md:py-24', className)}>
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">{children}</div>
    </section>
  );
}

/* Section heading block: eyebrow + title + optional description and action. */
export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between',
        className,
      )}
    >
      <div className="max-w-2xl">
        {eyebrow && <Eyebrow className="mb-3">{eyebrow}</Eyebrow>}
        <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/* A labelled numeric/stat cell used in stat strips and guide meta. */
export function Stat({
  label,
  value,
  hint,
  className,
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
        {label}
      </span>
      <span className="text-2xl font-bold text-foreground md:text-3xl">{value}</span>
      {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
    </div>
  );
}

/* Small pill / tag. */
export function Tag({
  children,
  tone = 'default',
  className,
}: {
  children: ReactNode;
  tone?: 'default' | 'gold' | 'success' | 'warning' | 'danger' | 'muted';
  className?: string;
}) {
  const tones: Record<string, string> = {
    default: 'border-border bg-secondary text-secondary-foreground',
    gold: 'border-primary/30 bg-primary/10 text-primary',
    success: 'border-success/30 bg-success/10 text-success',
    warning: 'border-warning/30 bg-warning/10 text-warning',
    danger: 'border-danger/30 bg-danger/10 text-danger',
    muted: 'border-border bg-transparent text-muted-foreground',
  };
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-md border px-2 py-0.5 font-mono text-[0.7rem] uppercase tracking-wider',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/* Card container with the site's panel treatment. */
export function Panel({
  children,
  className,
  as: As = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'article';
}) {
  return (
    <As
      className={cn(
        'rounded-xl border border-border bg-card p-6 transition-colors',
        className,
      )}
    >
      {children}
    </As>
  );
}

/* Text link with arrow used for "view all" style actions. */
export function ArrowLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.15em] text-primary transition-colors hover:text-primary/80',
        className,
      )}
    >
      {children}
      <span className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">
        →
      </span>
    </Link>
  );
}
