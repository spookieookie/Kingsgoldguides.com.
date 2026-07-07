interface QuickAnswerBoxProps {
  answer: string;
  goldClaim: string;
}

export function QuickAnswerBox({ answer, goldClaim }: QuickAnswerBoxProps) {
  return (
    <div className="bg-secondary border border-border rounded-lg p-6 mb-8">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-primary mb-2">Gold Claim</h3>
        <p className="text-foreground text-lg font-bold">{goldClaim}</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-primary mb-2">Quick Answer</h3>
        <p className="text-foreground leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}
