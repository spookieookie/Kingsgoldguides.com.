import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items?: FAQItem[];
}

export function FAQAccordion({ items = [] }: FAQAccordionProps) {
  if (items.length === 0) return null;

  return (
    <div className="mb-8 space-y-2">
        {items.map((item, idx) => (
          <details
            key={item.question}
            open={idx === 0}
            className="group border border-border rounded-lg overflow-hidden"
          >
            <summary
              className="w-full cursor-pointer list-none p-4 flex justify-between items-center gap-4 bg-secondary hover:bg-secondary/80 transition-colors text-left [&::-webkit-details-marker]:hidden"
            >
              <span className="font-semibold text-foreground">{item.question}</span>
              <ChevronDown
                size={20}
                aria-hidden="true"
                className="shrink-0 text-primary transition-transform group-open:rotate-180"
              />
            </summary>
              <div className="p-4 bg-background border-t border-border">
                <p className="text-foreground leading-relaxed">{item.answer}</p>
              </div>
          </details>
        ))}
    </div>
  );
}
