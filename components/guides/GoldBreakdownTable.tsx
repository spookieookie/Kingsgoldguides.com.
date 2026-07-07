interface GoldRow {
  activity: string;
  goldPerHour: number;
  requirements: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

interface GoldBreakdownTableProps {
  rows: GoldRow[];
}

function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case 'Easy':
      return 'text-green-400';
    case 'Medium':
      return 'text-yellow-400';
    case 'Hard':
      return 'text-red-400';
    default:
      return 'text-foreground';
  }
}

export function GoldBreakdownTable({ rows }: GoldBreakdownTableProps) {
  return (
    <div className="mb-8 overflow-x-auto">
      <h3 className="text-2xl font-bold text-foreground mb-4">Gold Breakdown</h3>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-secondary border-b border-border">
            <th className="p-3 text-left font-semibold text-primary">Activity</th>
            <th className="p-3 text-left font-semibold text-primary">Gold/Hour</th>
            <th className="p-3 text-left font-semibold text-primary">Requirements</th>
            <th className="p-3 text-left font-semibold text-primary">Difficulty</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr
              key={idx}
              className={`border-b border-border ${
                idx % 2 === 0 ? 'bg-background' : 'bg-secondary'
              }`}
            >
              <td className="p-3 text-foreground">{row.activity}</td>
              <td className="p-3 text-foreground font-semibold">
                {row.goldPerHour.toLocaleString()} g
              </td>
              <td className="p-3 text-foreground text-sm">{row.requirements}</td>
              <td className={`p-3 font-semibold ${getDifficultyColor(row.difficulty)}`}>
                {row.difficulty}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
