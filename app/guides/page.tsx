import Link from 'next/link';
import type { Metadata } from 'next';
import { getGuides } from '@/lib/mdx';
import { BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'All Gold Guides | WoW Gold Guides',
  description: 'Browse all World of Warcraft gold-making guides and farming strategies.',
};

export default async function GuidesPage() {
  const guides = await getGuides();

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16 lg:py-20">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen size={32} className="text-primary" />
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
              Gold-Making Guides
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Master the art of gold farming with our comprehensive guides covering gathering,
            flipping, and advanced money-making strategies in World of Warcraft.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group p-6 bg-secondary border border-border rounded-lg hover:border-primary hover:bg-secondary/80 transition-all"
            >
              <div className="mb-3">
                <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-sm font-semibold rounded-full">
                  {guide.expansion}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {guide.title}
              </h2>

              <p className="text-muted-foreground mb-4">{guide.quickAnswer}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {guide.professions.map((prof) => (
                  <span
                    key={prof}
                    className="px-2 py-1 bg-background text-foreground text-xs rounded"
                  >
                    {prof}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  {guide.goldClaimHeadline}
                </p>
                <span className="text-primary font-semibold group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
