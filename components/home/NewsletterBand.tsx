import { EmailCaptureForm } from '@/components/guides/EmailCaptureForm';
import { Eyebrow } from '@/components/ui/kit';

export function NewsletterBand() {
  return (
    <section className="border-t border-border/60">
      <div className="mx-auto w-full max-w-4xl px-4 py-16 text-center md:px-6 md:py-24">
        <Eyebrow className="mb-4 justify-center">Gold drop</Eyebrow>
        <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Get the plays before the market catches on
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-pretty leading-relaxed text-muted-foreground">
          New farming routes, flips, and economy briefs — delivered when they&apos;re
          fresh, never when they&apos;re stale.
        </p>
        <div className="mx-auto mt-8 max-w-xl text-left">
          <EmailCaptureForm />
        </div>
      </div>
    </section>
  );
}
