import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/guides/Breadcrumbs';
import { ContactForm } from '@/components/ContactForm';
import { Mail, Send } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact | WoW Gold Guides',
  description: 'Get in touch with WoW Gold Guides. Share feedback, suggestions, or questions.',
};

export default function ContactPage() {

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-12 sm:py-16">
        <Breadcrumbs
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Contact', href: '/contact' },
          ]}
        />

        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-2">
          Get in Touch
        </h1>
        <p className="text-lg text-muted-foreground mb-12">
          Have questions, suggestions, or feedback? We&apos;d love to hear from you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 bg-secondary border border-border rounded-lg">
            <Mail size={24} className="text-primary mb-3" />
            <h3 className="font-bold text-foreground mb-2">Email</h3>
            <p className="text-muted-foreground text-sm">
              contact@wowgoldguides.com
            </p>
          </div>

          <div className="p-6 bg-secondary border border-border rounded-lg">
            <Send size={24} className="text-primary mb-3" />
            <h3 className="font-bold text-foreground mb-2">Response Time</h3>
            <p className="text-muted-foreground text-sm">
              We typically respond within 24 hours
            </p>
          </div>

          <div className="p-6 bg-secondary border border-border rounded-lg">
            <Mail size={24} className="text-primary mb-3" />
            <h3 className="font-bold text-foreground mb-2">Newsletter</h3>
            <p className="text-muted-foreground text-sm">
              Subscribe for weekly updates
            </p>
          </div>
        </div>

        <ContactForm />
      </div>
    </main>
  );
}
