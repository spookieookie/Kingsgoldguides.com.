import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { mainNav, siteConfig } from '@/lib/site';

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div>
            <Logo />
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">{siteConfig.description}</p>
          </div>
          <nav aria-label="Footer navigation" className="flex flex-wrap items-start gap-x-6 gap-y-3 text-sm">
            {mainNav.map((item) => (
              <Link key={item.href} href={item.href} className="text-foreground transition-colors hover:text-primary">{item.label}</Link>
            ))}
          </nav>
        </div>
        <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-6 text-xs text-muted-foreground">
          <Link href="/about" className="hover:text-primary">About</Link>
          <Link href="/contact" className="hover:text-primary">Contact</Link>
          <a href={siteConfig.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-primary">YouTube</a>
        </div>
        <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.fullName}. World of Warcraft is a trademark of Blizzard Entertainment, Inc. This site is not affiliated with Blizzard.
        </p>
      </div>
    </footer>
  );
}
