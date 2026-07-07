import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { hubs, siteConfig } from '@/lib/site';

const resources = [
  { href: '/videos', label: 'Video Library' },
  { href: '/tools', label: 'Gold Tools' },
  { href: '/economy/darkmoon-firewater', label: 'Darkmoon Firewater' },
  { href: '/about', label: 'About' },
  { href: '/authors/king-kunta', label: 'Author: King Kunta' },
  { href: '/contact', label: 'Contact' },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <h4 className="kicker mb-4">Silos</h4>
            <ul className="space-y-2.5 text-sm">
              {hubs.map((hub) => (
                <li key={hub.key}>
                  <Link
                    href={hub.href}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {hub.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="kicker mb-4">Resources</h4>
            <ul className="space-y-2.5 text-sm">
              {resources.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="kicker mb-4">Follow</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={siteConfig.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  YouTube
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
                  Twitter / X
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
                  Discord
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.fullName}. World of Warcraft is a trademark of
            Blizzard Entertainment, Inc. This site is not affiliated with Blizzard.
          </p>
          <div className="flex gap-5 text-xs">
            <a href="#" className="text-muted-foreground hover:text-primary">
              Privacy
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary">
              Terms
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary">
              Disclaimer
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
