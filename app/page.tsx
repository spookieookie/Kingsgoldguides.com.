import Link from 'next/link';
import type { Metadata } from 'next';
import { getGuides } from '@/lib/mdx';
import { ArrowRight, Zap, TrendingUp, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'WoW Gold Guides - Master World of Warcraft Gold Making',
  description:
    'Complete guides to making gold in World of Warcraft. Learn gathering routes, auction house flipping, and advanced strategies to maximize your profit.',
  openGraph: {
    title: 'WoW Gold Guides - Master World of Warcraft Gold Making',
    description:
      'Complete guides to making gold in World of Warcraft. Learn gathering routes, auction house flipping, and advanced strategies.',
    type: 'website',
  },
};

async function HomePage() {
  const guides = await getGuides();
  const featuredGuides = guides.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-secondary to-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-semibold">
              Master the Gold Game
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6">
              Earn{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Thousands of Gold
              </span>
              {' '}Daily
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Learn proven strategies and routes from experienced WoW players. From gathering to auction house flipping, we cover every method to maximize your wealth.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/guides"
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-2"
              >
                Explore Guides
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/about"
                className="px-8 py-3 bg-secondary border border-border text-foreground rounded-lg font-semibold hover:border-primary transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">
            Why Join Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-secondary rounded-lg border border-border">
              <Zap size={32} className="text-primary mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">
                Proven Strategies
              </h3>
              <p className="text-muted-foreground">
                Learn battle-tested farming routes and strategies that generate consistent gold.
              </p>
            </div>
            <div className="p-6 bg-secondary rounded-lg border border-border">
              <TrendingUp size={32} className="text-primary mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">
                Detailed Breakdowns
              </h3>
              <p className="text-muted-foreground">
                Get gold-per-hour estimates, route maps, and profit calculations for every guide.
              </p>
            </div>
            <div className="p-6 bg-secondary rounded-lg border border-border">
              <BookOpen size={32} className="text-primary mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">
                Regular Updates
              </h3>
              <p className="text-muted-foreground">
                Guides are updated regularly to reflect current market conditions and meta changes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Guides Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-secondary/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                Featured Guides
              </h2>
              <p className="text-muted-foreground">
                Start with our most popular gold-making strategies
              </p>
            </div>
            <Link
              href="/guides"
              className="text-primary hover:text-accent font-semibold inline-flex items-center gap-2"
            >
              View All <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group p-6 bg-background border border-border rounded-lg hover:border-primary hover:bg-secondary transition-all"
              >
                <div className="mb-3 flex gap-2">
                  <span className="px-2 py-1 bg-primary/20 text-primary text-xs font-semibold rounded">
                    {guide.expansion}
                  </span>
                  <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded">
                    {guide.zone}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {guide.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {guide.quickAnswer}
                </p>
                <p className="text-primary font-semibold text-sm group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Read Guide <ArrowRight size={16} />
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-background">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Ready to Maximize Your Gold?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Subscribe to get notified about new guides, market updates, and gold-making tips.
          </p>
          <form className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default HomePage;
