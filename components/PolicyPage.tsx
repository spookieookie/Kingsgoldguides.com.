import type { ReactNode } from 'react';
import { Breadcrumbs } from '@/components/guides/Breadcrumbs';
export function PolicyPage({ title, path, children }: { title: string; path: string; children: ReactNode }) {
  return <main className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14"><Breadcrumbs crumbs={[{label:'Home',href:'/'},{label:title,href:path}]} /><h1 className="mt-6 text-3xl font-bold text-foreground md:text-4xl">{title}</h1><p className="mt-3 text-xs text-muted-foreground">Updated October 16, 2026</p><div className="prose prose-invert mt-8">{children}</div></main>;
}
