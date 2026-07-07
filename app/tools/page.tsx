import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/guides/Breadcrumbs';
import { Download } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tools & Downloads | WoW Gold Guides',
  description: 'Download spreadsheets, calculators, and tools to optimize your gold-making.',
};

export default function ToolsPage() {
  const downloads = [
    {
      id: 1,
      title: 'Herbalism Routes Spreadsheet',
      description: 'Complete herbalism farming routes with timing, profitability, and location data.',
      file: '/downloads/herbalism-routes.xlsx',
      size: '245 KB',
    },
    {
      id: 2,
      title: 'Mining Routes Spreadsheet',
      description: 'Optimized mining routes across all zones with ore density and respawn times.',
      file: '/downloads/mining-routes.xlsx',
      size: '198 KB',
    },
    {
      id: 3,
      title: 'Transmog Flipping List',
      description: 'Database of profitable transmog items with estimated margins and current prices.',
      file: '/downloads/transmog-flipping-list.xlsx',
      size: '512 KB',
    },
    {
      id: 4,
      title: 'Gold-Making Profit Calculator',
      description:
        'Spreadsheet to track your farming sessions and calculate hourly gold rates.',
      file: '/downloads/profit-calculator.xlsx',
      size: '156 KB',
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-12 sm:py-16">
        <Breadcrumbs
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Tools', href: '/tools' },
          ]}
        />

        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-2">
          Tools & Downloads
        </h1>
        <p className="text-lg text-muted-foreground mb-12">
          Free spreadsheets and tools to help you track your farming, calculate profits, and
          identify opportunities.
        </p>

        <div className="space-y-4">
          {downloads.map((download) => (
            <a
              key={download.id}
              href={download.file}
              download
              className="block p-6 bg-secondary border border-border rounded-lg hover:border-primary hover:bg-secondary/80 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-3 bg-primary rounded-lg group-hover:scale-110 transition-transform">
                  <Download size={24} className="text-background" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-1">
                    {download.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {download.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {download.size}
                  </p>
                </div>
                <div className="text-primary font-semibold group-hover:translate-x-1 transition-transform flex-shrink-0">
                  ↓
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-12 p-6 bg-secondary border border-border rounded-lg">
          <h3 className="text-lg font-bold text-foreground mb-3">
            Using These Tools
          </h3>
          <ul className="space-y-2 text-foreground">
            <li>
              <strong>Route Spreadsheets:</strong> Use these to plan your farming sessions and track
              which routes are most profitable on your server.
            </li>
            <li>
              <strong>Profit Calculator:</strong> Log your farming hours and let the calculator
              determine your actual gold per hour.
            </li>
            <li>
              <strong>Flipping Data:</strong> Reference current market prices and flip opportunities
              directly in your flipping spreadsheet.
            </li>
          </ul>
        </div>

        <div className="mt-8 p-6 bg-accent/10 border border-accent/50 rounded-lg">
          <p className="text-foreground">
            <strong>Pro Tip:</strong> These spreadsheets are templates. Feel free to customize them
            for your server, time zone, and playstyle. The most successful farmers track their data
            meticulously to identify trends and opportunities.
          </p>
        </div>
      </div>
    </main>
  );
}
