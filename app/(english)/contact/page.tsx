import type { Metadata } from 'next';
import { PlayCircle, ArrowUpRight } from 'lucide-react';
import { Breadcrumbs } from '@/components/guides/Breadcrumbs';
import { siteConfig } from '@/lib/site';
export const metadata: Metadata = { title: { absolute: "Contact King K | Kings Gold Guides" }, description: 'Contact King K for business inquiries, suggest a WoW gold farm, or ask a guide question on YouTube.', alternates: { canonical: `${siteConfig.domain}/contact` } };
export default function ContactPage() {
 return (
  <main className="mx-auto min-h-[60vh] max-w-3xl px-4 py-12 md:px-6">
   <Breadcrumbs crumbs={[{label:'Home',href:'/'},{label:'Contact',href:'/contact'}]} />
   <h1 className="mt-6 text-4xl font-bold text-foreground">Got a farm I should try?</h1>
   <p className="mt-5 text-lg leading-relaxed text-muted-foreground">Leave a comment on one of my videos. If you have a question about a guide, use that guide’s video so I know which farm you mean.</p>
   <a href={`${siteConfig.youtube}/videos`} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground"><PlayCircle className="h-5 w-5" aria-hidden="true" /> Go to my YouTube channel <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
   <section className="mt-12" aria-labelledby="business-inquiries">
    <h2 id="business-inquiries" className="text-xl font-bold text-foreground">Business inquiries</h2>
    <p className="mt-3 leading-relaxed text-muted-foreground">For business inquiries, email me at <a href="mailto:kingkuntaytbusinessinquiries@gmail.com" className="break-all text-primary underline underline-offset-4 hover:text-primary/80">kingkuntaytbusinessinquiries@gmail.com</a>.</p>
   </section>
   <h2 className="mt-12 text-xl font-bold text-foreground">Something changed?</h2>
   <p className="mt-3 leading-relaxed text-muted-foreground">Tell me the guide name, what changed, and whether you are playing Retail or a Classic version. Keep private information out of public comments.</p>
  </main>
 );
}

