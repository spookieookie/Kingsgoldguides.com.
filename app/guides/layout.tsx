import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WoW Gold Guides',
  description: 'Complete guides to making gold in World of Warcraft',
};

export default function GuidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
