import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/guides/Breadcrumbs';
import { ContactForm } from '@/components/ContactForm';
import { Mail, PlayCircle, Send } from 'lucide-react';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: `Contact | ${siteConfig.name}`,
  description:
    'Get in touch with King Kunta. Suggest a farm to test, share market data, or ask a gold-making question.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
        <Breadcrumbs
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Contact', href: '/contact' },
          ]}
        />

        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">
          Open a line
        </p>
        <h1 className="mb-2 text-balance text-4xl font-bold text-foreground sm:text-5xl">
          Contact King Kunta
        </h1>
        <p className="mb-12 text-pretty text-lg leading-relaxed text-muted-foreground">
          Found a farm worth testing? Sitting on market data from your realm? Want a
          strategy broken down on video? Send it through.
        </p>

        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-border bg-secondary p-6">
            <Mail size={24} className="mb-3 text-primary" />
            <h3 className="mb-2 font-bold text-foreground">Email</h3>
            <p className="text-sm text-muted-foreground">
              contact@kingsgoldguides.com
            </p>
          </div>

          <div className="rounded-lg border border-border bg-secondary p-6">
            <Send size={24} className="mb-3 text-primary" />
            <h3 className="mb-2 font-bold text-foreground">Response time</h3>
            <p className="text-sm text-muted-foreground">
              Usually within 24 hours
            </p>
          </div>

          <div className="rounded-lg border border-border bg-secondary p-6">
            <PlayCircle size={24} className="mb-3 text-primary" />
            <h3 className="mb-2 font-bold text-foreground">YouTube</h3>
            <p className="text-sm text-muted-foreground">
              Comment on any video — guide requests get priority
            </p>
          </div>
        </div>

        <ContactForm />
      </div>
    </main>
  );
}
