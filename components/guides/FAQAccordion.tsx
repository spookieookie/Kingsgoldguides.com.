'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items?: FAQItem[];
}

export function FAQAccordion({ items = [] }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (items.length === 0) return null;

  return (
    <div className="mb-8">
      <h3 className="text-2xl font-bold text-foreground mb-4">Frequently Asked Questions</h3>
      <div className="space-y-2">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="border border-border rounded-lg overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full p-4 flex justify-between items-center bg-secondary hover:bg-secondary/80 transition-colors text-left"
            >
              <span className="font-semibold text-foreground">{item.question}</span>
              <ChevronDown
                size={20}
                className={`text-primary transition-transform ${
                  openIndex === idx ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openIndex === idx && (
              <div className="p-4 bg-background border-t border-border">
                <p className="text-foreground leading-relaxed">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
