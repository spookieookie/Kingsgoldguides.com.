import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface Crumb {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  crumbs: Crumb[];
}

export function Breadcrumbs({ crumbs }: BreadcrumbsProps) {
  return (
    <nav
      className="flex items-center gap-2 text-sm text-muted-foreground mb-6"
      aria-label="Breadcrumb"
    >
      {crumbs.map((crumb, idx) => (
        <div key={idx} className="flex items-center gap-2">
          {idx > 0 && <ChevronRight size={16} className="text-muted-foreground" />}
          <Link
            href={crumb.href}
            className="hover:text-primary transition-colors"
          >
            {crumb.label}
          </Link>
        </div>
      ))}
    </nav>
  );
}
