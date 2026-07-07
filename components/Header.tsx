'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary flex-shrink-0">
          WoW Gold Guides
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/guides"
            className="text-foreground hover:text-primary transition-colors"
          >
            Guides
          </Link>
          <Link
            href="/tools"
            className="text-foreground hover:text-primary transition-colors"
          >
            Tools
          </Link>
          <Link
            href="/about"
            className="text-foreground hover:text-primary transition-colors"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-foreground hover:text-primary transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 hover:bg-secondary rounded transition-colors"
        >
          {isOpen ? (
            <X size={24} className="text-foreground" />
          ) : (
            <Menu size={24} className="text-foreground" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-border px-4 py-3 space-y-2 bg-secondary">
          <Link
            href="/guides"
            className="block p-2 text-foreground hover:text-primary hover:bg-background rounded transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Guides
          </Link>
          <Link
            href="/tools"
            className="block p-2 text-foreground hover:text-primary hover:bg-background rounded transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Tools
          </Link>
          <Link
            href="/about"
            className="block p-2 text-foreground hover:text-primary hover:bg-background rounded transition-colors"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            href="/contact"
            className="block p-2 text-foreground hover:text-primary hover:bg-background rounded transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}
