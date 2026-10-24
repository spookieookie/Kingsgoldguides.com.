import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: siteConfig.name },
  description:
    'The complete King Kunta gold guide library — farming routes, auction house flips, and market analysis for World of Warcraft.',
};

export default function GuidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

