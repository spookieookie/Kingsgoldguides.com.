import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/guides/Breadcrumbs';
import { Mail } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About | WoW Gold Guides',
  description: 'Learn about our mission to help World of Warcraft players maximize their gold earnings.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-12 sm:py-16">
        <Breadcrumbs
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'About', href: '/about' },
          ]}
        />

        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
          About WoW Gold Guides
        </h1>

        <div className="prose text-foreground space-y-6">
          <p className="text-lg text-muted-foreground">
            WoW Gold Guides was founded with a simple mission: to help World of Warcraft players
            earn consistent gold through proven, tested strategies and farming routes. Whether you
            are a casual player looking to fund your subscriptions or a hardcore entrepreneur aiming
            to reach billions, we have guides for every playstyle.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8">Our Mission</h2>
          <p>
            We believe that gold-making in World of Warcraft should be accessible to everyone. By
            providing detailed guides, route maps, and profit breakdowns, we empower players to take
            control of their in-game economy and achieve their financial goals.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8">What We Cover</h2>
          <ul className="space-y-3 text-foreground">
            <li>
              <strong>Gathering Strategies:</strong> Herbalism, mining, and skinning routes optimized
              for maximum efficiency and profit.
            </li>
            <li>
              <strong>Crafting Guides:</strong> Profitable crafts and market analysis to identify
              which items sell best on your server.
            </li>
            <li>
              <strong>Auction House Flipping:</strong> Advanced trading techniques and market
              psychology to turn a profit on resold items.
            </li>
            <li>
              <strong>Farming Routes:</strong> Complete route maps with estimated gold per hour and
              best times to farm.
            </li>
            <li>
              <strong>Market Analysis:</strong> Weekly price tracking and profit predictions to help
              you make informed decisions.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mt-8">Why Trust Us?</h2>
          <p>
            Our guides are created by experienced players who have tested every strategy on live
            servers. We update our content regularly to reflect current market conditions, balance
            changes, and new expansion content. Every guide includes honest profit estimates, difficulty
            ratings, and profit-per-hour calculations.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8">Staying Current</h2>
          <p>
            The WoW economy changes constantly. We monitor market trends, patch notes, and player
            feedback to ensure our guides remain accurate and profitable. Subscribe to our newsletter
            to get notified about major updates and market shifts.
          </p>

          <div className="mt-12 p-6 bg-secondary border border-border rounded-lg">
            <div className="flex items-start gap-4">
              <Mail size={24} className="text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">Get in Touch</h3>
                <p className="text-muted-foreground mb-4">
                  Have a question or suggestion? We&apos;d love to hear from you. Contact us or join
                  our community to discuss gold-making strategies with other players.
                </p>
                <Link
                  href="/contact"
                  className="text-primary hover:text-accent font-semibold inline-flex items-center gap-2"
                >
                  Send a Message →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
