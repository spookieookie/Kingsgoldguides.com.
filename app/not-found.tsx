import Link from 'next/link';
import { ArrowRight, Compass } from 'lucide-react';
import { hubs } from '@/lib/site';

export default function NotFound() {
  return (
    <main className="bg-grid flex min-h-[70vh] items-center bg-background">
      <div className="mx-auto w-full max-w-2xl px-4 py-20 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">
          404 — route not found
        </p>
        <h1 className="mt-4 text-balance text-4xl font-bold text-foreground sm:text-5xl">
          This farm spot doesn&apos;t exist
        </h1>
        <p className="mx-auto mt-4 max-w-md text-pretty leading-relaxed text-muted-foreground">
          The page you&apos;re looking for was moved, renamed, or never dropped. Head back
          to a hub and keep farming.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Compass className="h-4 w-4" aria-hidden="true" />
            Back to home
          </Link>
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            Browse all guides
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <nav aria-label="Hubs" className="mt-12">
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {hubs.map((hub) => (
              <li key={hub.key}>
                <Link
                  href={hub.href}
                  className="font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
                >
                  {hub.navLabel}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </main>
  );
}
