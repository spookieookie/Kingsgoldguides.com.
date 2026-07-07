import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-foreground mb-4">WoW Gold Guides</h3>
            <p className="text-muted-foreground text-sm">
              Master the art of gold-making in World of Warcraft with proven strategies and
              detailed guides.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-3">Guides</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/guides" className="text-muted-foreground hover:text-primary">
                  All Guides
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/herbalism-farming-guide"
                  className="text-muted-foreground hover:text-primary"
                >
                  Herbalism
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/mining-ore-routes"
                  className="text-muted-foreground hover:text-primary"
                >
                  Mining
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-3">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/tools" className="text-muted-foreground hover:text-primary">
                  Tools
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-3">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary">
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2026 WoW Gold Guides. All rights reserved. World of Warcraft is a trademark of
            Blizzard Entertainment, Inc.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-primary text-sm">
              Twitter
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary text-sm">
              Discord
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary text-sm">
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
